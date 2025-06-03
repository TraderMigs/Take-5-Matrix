import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Shield, FileText, AlertTriangle } from "lucide-react";

interface LegalAcceptanceProps {
  isOpen: boolean;
  onAccept: () => void;
}

export default function LegalAcceptance({ isOpen, onAccept }: LegalAcceptanceProps) {
  const [hasAccepted, setHasAccepted] = useState(false);

  if (!isOpen) return null;

  const handleAccept = () => {
    if (hasAccepted) {
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl max-w-4xl w-full min-h-[90vh] max-h-fit flex flex-col my-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-black dark:text-white text-center">
            Legal Policies & Disclaimers
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
            Please read and accept these terms to continue using Take 5
          </p>
        </div>

        <ScrollArea className="flex-1 p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-8">
            {/* Privacy Policy */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-black dark:text-white">1. Privacy Policy</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Effective Date:</strong> June 6, 2025
              </p>
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Take 5</strong> ("we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use the Take 5 app (the "App").
                </p>
                
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">1.1 Information We Collect:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Personal details you provide (e.g., name, email address, emergency contact info)</li>
                    <li>Journaling entries (stored locally or securely encrypted if on our servers)</li>
                    <li>Usage data (pages visited, buttons clicked, interactions with the app)</li>
                    <li>Device data (device type, operating system, browser type)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">1.2 How We Use Your Data:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>To operate and maintain the App</li>
                    <li>To allow you to use personalized features (e.g., diary, emergency contacts)</li>
                    <li>To improve user experience and develop new features</li>
                    <li>To send occasional updates or alerts if you opt-in</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">1.3 Sharing of Data:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>We do <strong>not</strong> sell your data</li>
                    <li>We do <strong>not</strong> share your private data with third parties unless legally required</li>
                    <li>We may use third-party services (e.g., YouTube API, Google Analytics), and their data collection practices are governed by their own policies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">1.4 Data Security:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>We implement industry-standard encryption and access controls</li>
                    <li>Users may request data deletion by emailing tradermigs@gmail.com</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">1.5 Your Rights (GDPR, CCPA, etc.):</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Right to access, correct, or delete your data</li>
                    <li>Right to withdraw consent or opt-out of communications</li>
                    <li>Right to lodge a complaint with a data protection authority</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="border-gray-300 dark:border-gray-600" />

            {/* Terms & Conditions */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-black dark:text-white">2. Terms & Conditions</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Effective Date:</strong> June 6, 2025
              </p>
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  By using the Take 5 app, you agree to the following terms. If you do not agree, do not use the App.
                </p>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">2.1 Eligibility:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You must be 18 years or older to use the App.</li>
                    <li>By using the App, you represent that you are at least 18 years old.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">2.2 No Medical Advice:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The App is for informational and motivational purposes only.</li>
                    <li><strong>Take 5 does not provide medical advice, diagnosis, or treatment.</strong></li>
                    <li>Content within the App (quotes, affirmations, AI chat, linked videos) is not intended to replace professional mental health or medical care.</li>
                    <li>Always consult a qualified healthcare provider for mental health issues.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">2.3 AI and Content Usage:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The AI chatbot is a basic conversational assistant. It is <strong>not</strong> a therapist, licensed counselor, or crisis worker.</li>
                    <li>Linked YouTube content is curated for convenience and positivity but is provided by third parties.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">2.4 Emergency Feature Disclaimer:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The emergency contact or services button is a user-triggered tool. <strong>We do not monitor or respond to emergency calls or messages.</strong></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">2.5 Limitation of Liability:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Use of the App is entirely at your own risk.</li>
                    <li>You agree that Take 5, its creators, affiliates, and team shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from use of the App.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">2.6 Account and Data:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You are responsible for maintaining the confidentiality of your data and password if account-based login is used.</li>
                    <li>You may request data deletion at any time via tradermigs@gmail.com</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">2.7 Changes to the Terms:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>These Terms may be updated periodically. Continued use after updates means you accept the changes.</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="border-gray-300 dark:border-gray-600" />

            {/* Disclaimer */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-black dark:text-white">3. Disclaimer Notice</h2>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                  <strong>DISCLAIMER:</strong> Take 5 is a supportive app created by an individual with personal experience in mental health. It is not a professional service. The App does not provide any diagnosis, treatment, therapy, or emergency support. By using this App, you agree that you are solely responsible for your actions and experiences. If you are experiencing a mental health crisis, please contact local emergency services or a licensed mental health provider immediately.
                </p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-4 font-medium">
                <strong>If you do not agree with any part of these notices, do not use the App.</strong>
              </p>
            </section>

            <Separator className="border-gray-300 dark:border-gray-600" />

            {/* Contact Information */}
            <section>
              <h3 className="text-lg font-bold text-black dark:text-white mb-3">Contact Us</h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <p>If you have any questions about your data, rights, or the terms listed here, contact:</p>
                <div className="space-y-1">
                  <p><strong>Email:</strong> tradermigs@gmail.com</p>
                  <p><strong>App Creator:</strong> U.S. Citizen residing in Thailand</p>
                  <p><strong>Governing Jurisdiction:</strong> United States (federal law), with international use acknowledged</p>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-black">
          <div className="bg-white dark:bg-gray-800 border-3 border-teal-500 rounded-lg p-4 mb-4 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Checkbox 
                  id="legal-acceptance"
                  checked={hasAccepted}
                  onCheckedChange={(checked) => setHasAccepted(checked === true)}
                  className="border-3 border-teal-500 w-6 h-6 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
              </div>
              <div className="flex-1">
                <label 
                  htmlFor="legal-acceptance" 
                  className="text-base text-white font-semibold cursor-pointer leading-relaxed block"
                >
                  ✓ Click here to confirm: I am 18 years or older. I have read and agree to the Privacy Policy, Terms & Conditions, and Disclaimer. I understand that Take 5 is not a substitute for professional help.
                </label>
                <p className="text-sm text-white mt-2 font-medium">
                  👆 Please check the box above to continue
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleAccept}
            disabled={!hasAccepted}
            className={`w-full py-3 text-lg font-semibold transition-colors ${
              hasAccepted 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Accept and Continue
          </Button>
        </div>
      </div>
    </div>
  );
}