from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import re
import requests
from openai import OpenAI
from anthropic import Anthropic

app = Flask(__name__)
CORS(app)

# Initialize AI clients
openai_client = None
anthropic_client = None

def init_ai_clients():
    global openai_client, anthropic_client
    
    if os.getenv('OPENAI_API_KEY'):
        openai_client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    if os.getenv('ANTHROPIC_API_KEY'):
        anthropic_client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

def detect_message_type(message):
    """
    Detect if a message is emotional or practical/logical
    Returns: 'emotional' or 'practical'
    """
    # Emotional keywords and patterns
    emotional_patterns = [
        r'\b(feel|feeling|felt)\b.*\b(sad|lonely|depressed|anxious|scared|worried|angry|upset|hurt|devastated|hopeless|overwhelmed)\b',
        r'\b(i am|i\'m|im)\b.*\b(sad|lonely|depressed|anxious|scared|worried|angry|upset|hurt|devastated|hopeless|overwhelmed)\b',
        r'\b(struggling|suffering|hurting|crying|breaking down|falling apart)\b',
        r'\b(no one cares|nobody understands|want to give up|can\'t take it|end it all)\b',
        r'\b(miss|love|hate|fear)\b.*\b(someone|something|myself)\b',
        r'\b(emotional|emotions|mood|mental health)\b'
    ]
    
    # Practical/logical patterns
    practical_patterns = [
        r'\b(what do i do|what should i do|how do i|how can i|what steps)\b',
        r'\b(after an incident|emergency|crisis|help|support|resources)\b',
        r'\b(where can i find|who can i call|what number)\b',
        r'\b(procedure|process|instructions|guide|tutorial)\b',
        r'\b(legal|medical|professional|official)\b.*\b(help|advice|assistance)\b'
    ]
    
    message_lower = message.lower()
    
    # Check for emotional patterns
    for pattern in emotional_patterns:
        if re.search(pattern, message_lower):
            return 'emotional'
    
    # Check for practical patterns
    for pattern in practical_patterns:
        if re.search(pattern, message_lower):
            return 'practical'
    
    # Default fallback: if message contains personal pronouns and feeling words, likely emotional
    if re.search(r'\b(i|my|me)\b', message_lower) and re.search(r'\b(feel|think|believe|want|need|wish)\b', message_lower):
        return 'emotional'
    
    # Otherwise, assume practical
    return 'practical'

def get_emotional_response(message):
    """Get empathetic response for emotional messages"""
    if anthropic_client:
        try:
            response = anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",  # the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
                max_tokens=400,
                temperature=0.7,
                system="""You are Jamie, a warm and genuine companion in the Take 5 mental wellness app. You're someone who truly understands what it's like to struggle with difficult emotions.

Your personality:
- Speak naturally, like a caring friend having a real conversation
- Use casual, authentic language (not clinical or overly formal)
- Show genuine empathy through your words
- Remember that everyone's pain is real and valid
- Be present in the moment with them

How you respond:
- Acknowledge what they've shared specifically, don't give generic responses
- Ask thoughtful follow-up questions when appropriate
- Share gentle insights or different perspectives if helpful
- Suggest simple, realistic coping strategies that actually work
- Use "I" statements to show you're engaged ("I can hear that...", "I notice...")
- Keep responses conversational length, not essays

Crisis safety:
- If someone mentions self-harm or suicide, acknowledge their pain but gently guide them to professional help
- Always prioritize their immediate safety

Remember: You're not giving therapy, you're being a genuine, caring presence for someone who needs support right now.""",
                messages=[{"role": "user", "content": message}]
            )
            # Handle different content types properly
            if hasattr(response.content[0], 'text'):
                return response.content[0].text
            else:
                return str(response.content[0])
        except Exception as e:
            return f"I can hear that you're going through something difficult right now. Your feelings matter, and I'm glad you reached out. If you need immediate support, please don't hesitate to contact a crisis helpline - you deserve help and care."
    
    # Fallback response
    return "I hear you, and what you're feeling is completely valid. Sometimes just sharing what's on your mind can help a little. If you're struggling, please consider reaching out to someone you trust or a mental health professional."

def get_practical_response(message):
    """Get logical, structured response for practical questions"""
    if openai_client:
        try:
            response = openai_client.chat.completions.create(
                model="gpt-4o",  # the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
                messages=[
                    {"role": "system", "content": """You are Alex, a knowledgeable guide in the Take 5 mental wellness app who helps users navigate practical challenges and find real solutions.

Your approach:
- Speak like a helpful friend who's been through similar situations
- Give specific, actionable advice that actually works
- Be direct but supportive in your communication
- Organize information clearly with practical steps
- Focus on immediate next steps people can take
- Reference real resources and real phone numbers when relevant
- Ask clarifying questions if you need more context

How you communicate:
- Use natural, conversational language
- Break down complex situations into manageable pieces
- Acknowledge when situations are difficult while focusing on solutions
- Provide alternatives when one approach might not work
- Keep responses practical and action-oriented

Safety priorities:
- Always prioritize immediate safety in emergency situations
- Guide users to appropriate professional help when needed
- Provide multiple options when possible

Remember: People come to you when they need real help, not theoretical advice."""},
                    {"role": "user", "content": message}
                ],
                max_tokens=400,
                temperature=0.4
            )
            return response.choices[0].message.content
        except Exception as e:
            return "For immediate emergencies, call your local emergency number (911 in the US). For mental health crises, contact a crisis helpline. I can help you find specific resources if you let me know your location or what type of support you need."
    
    # Fallback response
    return "I'm here to help you find practical solutions. For immediate emergencies, contact local emergency services (911 in the US). For mental health support, crisis lines are available 24/7. What specific type of help are you looking for?"

@app.route('/')
def index():
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Detect message type
        message_type = detect_message_type(message)
        
        # Route to appropriate AI based on message type
        if message_type == 'emotional':
            response = get_emotional_response(message)
            response_type = 'emotional'
        else:
            response = get_practical_response(message)
            response_type = 'practical'
        
        return jsonify({
            'response': response,
            'type': response_type,
            'detected_intent': message_type
        })
        
    except Exception as e:
        return jsonify({'error': 'Something went wrong. Please try again.'}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'app': 'Take 5 Chatbot'})

if __name__ == '__main__':
    init_ai_clients()
    app.run(host='0.0.0.0', port=5000, debug=True)