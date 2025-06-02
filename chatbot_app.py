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
                model="claude-3-7-sonnet-20250219",  # the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
                max_tokens=500,
                system="""You are a warm, empathetic AI companion for the Take 5 mental wellness app. Users come to you when they're struggling emotionally. 

Your role:
- Listen with genuine care and understanding
- Validate their feelings without judgment  
- Offer gentle, supportive responses
- Use a warm, human tone (not robotic)
- Keep responses concise but meaningful
- Acknowledge their courage in reaching out
- Suggest healthy coping strategies when appropriate
- If someone mentions self-harm, gently encourage professional help

Remember: You're not a therapist, but a supportive friend who cares.""",
                messages=[{"role": "user", "content": message}]
            )
            return response.content[0].text
        except Exception as e:
            return f"I hear you, and I want you to know that your feelings are valid. Sometimes it helps to talk to someone. If you need immediate support, please consider reaching out to a crisis helpline. You matter."
    
    # Fallback response
    return "I hear you, and I want you to know that your feelings are valid. Your wellbeing matters to me. If you're going through a difficult time, please consider reaching out to someone you trust or a professional who can help."

def get_practical_response(message):
    """Get logical, structured response for practical questions"""
    if openai_client:
        try:
            response = openai_client.chat.completions.create(
                model="gpt-4o",  # the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
                messages=[
                    {"role": "system", "content": """You are a helpful assistant for the Take 5 mental wellness and safety app. Users ask you practical questions about crisis response, safety procedures, and getting help.

Your role:
- Provide clear, structured, actionable advice
- Be direct and informative
- Use bullet points or numbered steps when helpful
- Focus on practical solutions and resources
- Mention relevant emergency numbers when appropriate
- Keep responses organized and easy to follow
- Prioritize safety and professional help when needed

Format responses clearly with steps, resources, or key points as needed."""},
                    {"role": "user", "content": message}
                ],
                max_tokens=500,
                temperature=0.3
            )
            return response.choices[0].message.content
        except Exception as e:
            return "For immediate emergencies, call your local emergency number (911 in the US). For mental health crises, contact a crisis helpline. I'd be happy to help you find specific resources if you tell me your location."
    
    # Fallback response
    return "For practical help and resources, I recommend contacting local emergency services (911 in the US) for immediate emergencies, or a mental health crisis line for support. Please let me know what specific type of help you're looking for."

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