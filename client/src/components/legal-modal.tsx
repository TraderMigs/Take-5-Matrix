import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, AlertTriangle, Scale } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface LegalModalProps {
  children: React.ReactNode;
}

export default function LegalModal({ children }: LegalModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-white dark:bg-black border-2 border-black dark:border-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-black dark:text-white">
            <Scale className="w-6 h-6" />
            {t('legalPoliciesDisclamers')}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="privacy" className="flex-1">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger 
              value="privacy" 
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-transparent data-[state=active]:bg-black data-[state=active]:text-white text-black dark:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">{t('privacyPolicy')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="terms" 
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-transparent data-[state=active]:bg-black data-[state=active]:text-white text-black dark:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">{t('termsConditions')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="disclaimer" 
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-transparent data-[state=active]:bg-black data-[state=active]:text-white text-black dark:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">{t('disclaimer')}</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] pr-4">
            <TabsContent value="privacy" className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Effective Date:</strong> June 6, 2025
                </p>
                <p>
                  <strong>Take 5</strong> ("we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use the Take 5 app (the "App").
                </p>
                
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Information We Collect:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Personal details you provide (e.g., name, email address, emergency contact info)</li>
                    <li>Journaling entries (stored locally or securely encrypted if on our servers)</li>
                    <li>Usage data (pages visited, buttons clicked, interactions with the app)</li>
                    <li>Device data (device type, operating system, browser type)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">How We Use Your Data:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>To operate and maintain the App</li>
                    <li>To allow you to use personalized features (e.g., diary, emergency contacts)</li>
                    <li>To improve user experience and develop new features</li>
                    <li>To send occasional updates or alerts if you opt-in</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Sharing of Data:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>We do <strong>not</strong> sell your data</li>
                    <li>We do <strong>not</strong> share your private data with third parties unless legally required</li>
                    <li>We may use third-party services (e.g., YouTube API, Google Analytics), and their data collection practices are governed by their own policies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Data Security:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>We implement industry-standard encryption and access controls</li>
                    <li>Users may request data deletion by emailing tradermigs@gmail.com</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Your Rights (GDPR, CCPA, etc.):</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Right to access, correct, or delete your data</li>
                    <li>Right to withdraw consent or opt-out of communications</li>
                    <li>Right to lodge a complaint with a data protection authority</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="terms" className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Effective Date:</strong> June 6, 2025
                </p>
                <p>
                  By using the Take 5 app, you agree to the following terms. If you do not agree, do not use the App.
                </p>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Eligibility:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You must be 18 years or older to use the App.</li>
                    <li>By using the App, you represent that you are at least 18 years old.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">No Medical Advice:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The App is for informational and motivational purposes only.</li>
                    <li><strong>Take 5 does not provide medical advice, diagnosis, or treatment.</strong></li>
                    <li>Content within the App (quotes, affirmations, AI chat, linked videos) is not intended to replace professional mental health or medical care.</li>
                    <li>Always consult a qualified healthcare provider for mental health issues.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">AI and Content Usage:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The AI chatbot is a basic conversational assistant. It is <strong>not</strong> a therapist, licensed counselor, or crisis worker.</li>
                    <li>Linked YouTube content is curated for convenience and positivity but is provided by third parties.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Emergency Feature Disclaimer:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The emergency contact or services button is a user-triggered tool. <strong>We do not monitor or respond to emergency calls or messages.</strong></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Limitation of Liability:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Use of the App is entirely at your own risk.</li>
                    <li>You agree that Take 5, its creators, affiliates, and team shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from use of the App.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Account and Data:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You are responsible for maintaining the confidentiality of your data and password if account-based login is used.</li>
                    <li>You may request data deletion at any time via tradermigs@gmail.com</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Changes to the Terms:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>These Terms may be updated periodically. Continued use after updates means you accept the changes.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="disclaimer" className="space-y-4">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                    <strong>DISCLAIMER:</strong> Take 5 is a supportive app created by an individual with personal experience in mental health. It is not a professional service. The App does not provide any diagnosis, treatment, therapy, or emergency support. By using this App, you agree that you are solely responsible for your actions and experiences. If you are experiencing a mental health crisis, please contact local emergency services or a licensed mental health provider immediately.
                  </p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <strong>If you do not agree with any part of these notices, do not use the App.</strong>
                </p>

                <Separator className="border-gray-300 dark:border-gray-600" />

                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-3">Contact Us</h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <p>If you have any questions about your data, rights, or the terms listed here, contact:</p>
                    <div className="space-y-1">
                      <p><strong>Email:</strong> tradermigs@gmail.com</p>
                      <p><strong>App Creator:</strong> U.S. Citizen residing in Thailand</p>
                      <p><strong>Governing Jurisdiction:</strong> United States (federal law), with international use acknowledged</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}