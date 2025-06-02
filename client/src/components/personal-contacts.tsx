import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Phone, Plus } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export default function PersonalContacts() {
  const [contacts, setContacts] = useLocalStorage<Contact[]>("trusted-contacts", []);
  const [isAddingContact, setIsAddingContact] = useState(false);
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

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">Your Trusted Contacts</h2>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-sage-green rounded-full flex items-center justify-center mr-3">
                <User className="text-white" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.relationship}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleCallContact(contact.phone)}
                className="bg-sage-green hover:bg-navy-blue text-white px-4 py-2 rounded-lg transition-colors"
                size="sm"
              >
                <Phone size={16} />
              </Button>
              <Button
                onClick={() => removeContact(contact.id)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

        <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-yellow-400 hover:bg-yellow-500 border-2 border-black p-4 rounded-xl transition-colors text-center text-black"
            >
              <Plus className="mr-2" size={16} />
              Add a trusted contact
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm w-full mx-auto bg-white dark:bg-black border-black dark:border-white fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" aria-describedby="contact-description">
            <DialogHeader>
              <DialogTitle className="text-black dark:text-white text-center">Add Trusted Contact</DialogTitle>
            </DialogHeader>
            <div id="contact-description" className="sr-only">
              Add a trusted person you can reach out to during difficult times
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-black dark:text-white">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Enter name"
                  className="contact-input bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-black dark:text-white">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="contact-input bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"
                />
              </div>
              <div>
                <Label htmlFor="relationship" className="text-black dark:text-white">Relationship</Label>
                <Input
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="e.g., Therapist, Friend, Family"
                  className="contact-input bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddContact} className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                  Add Contact
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingContact(false)}
                  className="flex-1 bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
