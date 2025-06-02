import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, User, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyContactDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: any;
}

export default function EmergencyContactDisplay({ isOpen, onClose, currentUser }: EmergencyContactDisplayProps) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && currentUser) {
      loadEmergencyContacts();
    }
  }, [isOpen, currentUser]);

  const loadEmergencyContacts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/emergency-contacts');
      if (response.ok) {
        const contactData = await response.json();
        setContacts(contactData);
      }
    } catch (error) {
      console.error('Failed to load emergency contacts:', error);
    }
    setIsLoading(false);
  };

  const handleCall = (contact: any) => {
    if (confirm(`Call ${contact.name} at ${contact.phone}?`)) {
      window.open(`tel:${contact.phone}`, '_self');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Heart className="w-5 h-5" />
            Emergency Contacts
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {currentUser ? (
            <>
              <div className="bg-purple-600 p-4 rounded-lg border border-purple-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">
                      {currentUser.displayName || currentUser.username}
                    </h3>
                    <p className="text-sm font-semibold text-purple-100">Phone Owner</p>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-4">
                  <p className="text-gray-600">Loading emergency contacts...</p>
                </div>
              ) : contacts.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Emergency Contacts:
                  </h4>
                  {contacts.map((contact, index) => (
                    <div key={contact.id || index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{contact.relationship}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{contact.phone}</p>
                      </div>
                      <Button
                        onClick={() => handleCall(contact)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 dark:text-gray-400">No emergency contacts configured.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Add emergency contacts in your profile settings.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Emergency Contact Info
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This feature shows emergency contacts for phone owners who have created an account.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                If you found this phone, please contact local authorities or check for emergency information in the phone's emergency settings.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Button
                onClick={() => window.open('tel:911', '_self')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Call 911
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-gray-400 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}