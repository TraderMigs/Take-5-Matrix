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
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg h-auto min-h-[80px]">
            <TabsTrigger 
              value="privacy" 
              className="flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-md bg-transparent data-[state=active]:bg-black data-[state=active]:text-white text-black dark:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all h-auto min-h-[70px]"
            >
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] font-medium text-center leading-tight break-words max-w-full">{t('privacyPolicy')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="terms" 
              className="flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-md bg-transparent data-[state=active]:bg-black data-[state=active]:text-white text-black dark:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all h-auto min-h-[70px]"
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] font-medium text-center leading-tight break-words max-w-full">{t('termsConditions')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="disclaimer" 
              className="flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-md bg-transparent data-[state=active]:bg-black data-[state=active]:text-white text-black dark:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all h-auto min-h-[70px]"
            >
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] font-medium text-center leading-tight break-words max-w-full">{t('disclaimer')}</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] pr-4">
            <TabsContent value="privacy" className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>{t('legalContent.effectiveDate')}</strong> {t('legalContent.privacyIntro')}
                </p>
                <p>
                  {t('legalContent.privacyIntro')}
                </p>
                
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.informationWeCollect')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.personalDetails')}</li>
                    <li>{t('legalContent.journalingEntries')}</li>
                    <li>{t('legalContent.usageData')}</li>
                    <li>{t('legalContent.deviceData')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.howWeUseData')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.operateApp')}</li>
                    <li>{t('legalContent.personalizedFeatures')}</li>
                    <li>{t('legalContent.improveExperience')}</li>
                    <li>{t('legalContent.sendUpdates')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.sharingData')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.noSellData')}</li>
                    <li>{t('legalContent.noSharePrivate')}</li>
                    <li>{t('legalContent.thirdPartyServices')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.dataSecurity')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.encryptionControls')}</li>
                    <li>{t('legalContent.dataDeletion')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.yourRights')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.rightAccess')}</li>
                    <li>{t('legalContent.rightWithdraw')}</li>
                    <li>{t('legalContent.rightComplaint')}</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="terms" className="space-y-4">
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>{t('legalContent.effectiveDate')}</strong>
                </p>
                <p>
                  {t('legalContent.termsIntro')}
                </p>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.eligibility')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.ageRequirement')}</li>
                    <li>{t('legalContent.ageRepresentation')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.noMedicalAdvice')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.informationalOnly')}</li>
                    <li><strong>{t('legalContent.noMedicalDiagnosis')}</strong></li>
                    <li>{t('legalContent.notReplacement')}</li>
                    <li>{t('legalContent.consultProvider')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.aiContentUsage')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.aiNotTherapist')}</li>
                    <li>{t('legalContent.thirdPartyContent')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.emergencyDisclaimer')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.emergencyUserTool')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.limitationLiability')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.useAtRisk')}</li>
                    <li>{t('legalContent.noLiability')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.accountData')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.dataConfidentiality')}</li>
                    <li>{t('legalContent.requestDeletion')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">{t('legalContent.changesTerms')}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{t('legalContent.termsUpdated')}</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="disclaimer" className="space-y-4">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                    <strong>{t('legalContent.disclaimerTitle')}</strong> {t('legalContent.disclaimerContent')}
                  </p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <strong>{t('legalContent.agreementRequired')}</strong>
                </p>

                <Separator className="border-gray-300 dark:border-gray-600" />

                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-3">{t('legalContent.contactUs')}</h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <p>{t('legalContent.contactInfo')}</p>
                    <div className="space-y-1">
                      <p><strong>{t('legalContent.email')}</strong> tradermigs@gmail.com</p>
                      <p><strong>{t('legalContent.appCreator')}</strong> {t('legalContent.creatorLocation')}</p>
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