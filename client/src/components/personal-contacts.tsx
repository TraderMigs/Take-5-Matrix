import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Phone, Plus, Edit, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useLanguage } from "@/hooks/use-language";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export default function PersonalContacts() {
  const { t } = useLanguage();
  const [contacts, setContacts] = useLocalStorage<Contact[]>("trusted-contacts", []);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        ...newContact,
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: "", phone: "", relationship: "" });
      setIsAddingContact(false);
    }
  };

  const handleCallContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship,
    });
  };

  const handleUpdateContact = () => {
    if (editingContact && newContact.name && newContact.phone) {
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { ...contact, ...newContact }
          : contact
      ));
      setEditingContact(null);
      setNewContact({ name: "", phone: "", relationship: "" });
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">{t('trustedContacts')}</h2>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
          >
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg p-2 -m-2">
                  <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center mr-3">
                    <User className="text-white dark:text-black" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{contact.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{contact.relationship}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="w-80 bg-white dark:bg-black border-black dark:border-white">
                <DialogHeader>
                  <DialogTitle className="text-black dark:text-white text-center">Edit Contact</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name" className="text-black dark:text-white">Name</Label>
                    <Input
                      id="edit-name"
                      value={contact.name}
                      onChange={(e) => {
                        const updatedContacts = contacts.map(c => 
                          c.id === contact.id ? { ...c, name: e.target.value } : c
                        );
                        setContacts(updatedContacts);
                      }}
                      className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-phone" className="text-black dark:text-white">Phone</Label>
                    <Input
                      id="edit-phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => {
                        const updatedContacts = contacts.map(c => 
                          c.id === contact.id ? { ...c, phone: e.target.value } : c
                        );
                        setContacts(updatedContacts);
                      }}
                      className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-relationship" className="text-black dark:text-white">Relationship</Label>
                    <Input
                      id="edit-relationship"
                      value={contact.relationship}
                      onChange={(e) => {
                        const updatedContacts = contacts.map(c => 
                          c.id === contact.id ? { ...c, relationship: e.target.value } : c
                        );
                        setContacts(updatedContacts);
                      }}
                      className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="flex-1 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white dark:bg-black border-black dark:border-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-black dark:text-white">Delete Contact</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                            Are you sure you want to remove "{contact.name}" from your trusted contacts? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => removeContact(contact.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => handleCallContact(contact.phone)}
              className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg transition-colors"
              size="sm"
            >
              <Phone size={16} />
            </Button>
          </div>
        ))}

        <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 border-2 border-black dark:border-white p-4 rounded-xl transition-colors text-center text-black dark:text-white"
            >
              <Plus className="mr-2" size={16} />
{t('addTrustedContact')}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-80 bg-white dark:bg-black border-black dark:border-white" aria-describedby="contact-description">
            <DialogHeader>
              <DialogTitle className="text-black dark:text-white text-center">{t('addTrustedContact')}</DialogTitle>
            </DialogHeader>
            <div id="contact-description" className="sr-only">
              Add a trusted person you can reach out to during difficult times
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-black dark:text-white">{t('name')}</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder={t('enterName')}
                  className="contact-input bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white placeholder:text-green-800 placeholder:opacity-50 placeholder:font-light"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-black dark:text-white">{t('phoneNumber')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder={t('enterPhone')}
                  className="contact-input bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white placeholder:text-green-800 placeholder:opacity-50 placeholder:font-light"
                />
              </div>
              <div>
                <Label htmlFor="relationship" className="text-black dark:text-white">{t('relationship')}</Label>
                <Input
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder={t('enterRelationship')}
                  className="contact-input bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white placeholder:text-green-800 placeholder:opacity-50 placeholder:font-light"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddContact} className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                  {t('addContact')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingContact(false)}
                  className="flex-1 bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  {t('cancel')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
