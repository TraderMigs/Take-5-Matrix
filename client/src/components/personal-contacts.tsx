import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Phone, Plus, Edit, Trash2 } from "lucide-react";

import { useLanguage } from "@/hooks/use-language";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import UserAccountClean from "@/components/user-account-clean";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface PersonalContactsProps {
  currentUser?: any;
  onLogin?: (user: any) => void;
}

export default function PersonalContacts({ currentUser, onLogin }: PersonalContactsProps) {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });

  // Only fetch contacts from database for authenticated users
  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    enabled: !!currentUser,
    retry: false,
  });

  // Mutation to create contact
  const createContactMutation = useMutation({
    mutationFn: async (contactData: Omit<Contact, 'id'>) => {
      return await apiRequest("/api/contacts", "POST", contactData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
  });

  // Mutation to update contact
  const updateContactMutation = useMutation({
    mutationFn: async ({ id, ...data }: Contact) => {
      return await apiRequest(`/api/contacts/${id}`, "PUT", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
  });

  // Mutation to delete contact
  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/contacts/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
  });

  const handleAddContact = async () => {
    console.log('handleAddContact called');
    console.log('currentUser:', currentUser);
    console.log('newContact:', newContact);
    
    if (!currentUser) {
      console.log('No user, redirecting to auth');
      // Require authentication to save contacts
      localStorage.setItem('take5_redirect_after_login', 'contacts');
      window.location.href = '/api/auth/google';
      return;
    }
    
    if (newContact.name && newContact.phone) {
      console.log('Saving contact to database');
      try {
        await createContactMutation.mutateAsync(newContact);
        console.log('Contact saved successfully');
        setNewContact({ name: "", phone: "", relationship: "" });
        setIsAddingContact(false);
      } catch (error) {
        console.error('Error saving contact:', error);
      }
    } else {
      console.log('Form validation failed - missing name or phone');
      console.log('Name:', newContact.name);
      console.log('Phone:', newContact.phone);
    }
  };

  const handleCallContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const removeContact = async (id: string) => {
    if (!currentUser) {
      localStorage.setItem('take5_redirect_after_login', 'contacts');
      window.location.href = '/api/auth/google';
      return;
    }
    
    await deleteContactMutation.mutateAsync(id);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship,
    });
  };

  const handleUpdateContact = async () => {
    if (!currentUser) {
      localStorage.setItem('take5_redirect_after_login', 'contacts');
      window.location.href = '/api/auth/google';
      return;
    }
    
    if (editingContact && newContact.name && newContact.phone) {
      await updateContactMutation.mutateAsync({
        id: editingContact.id,
        ...newContact,
      });
      setEditingContact(null);
      setNewContact({ name: "", phone: "", relationship: "" });
      setEditDialogOpen(false);
    }
  };

  return (
    <section className="space-y-4" data-section="contacts">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">{t('trustedContacts')}</h2>

      {!currentUser ? (
        <div className="text-center py-8">
          <p className="text-black dark:text-white text-base font-normal mb-6">
            Log In to Create Your Emergency Contacts List
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => setShowUserAccount(true)}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg"
            >
              Log In
            </Button>
            <Button
              onClick={() => setShowUserAccount(true)}
              variant="outline"
              className="w-full bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white px-6 py-3 rounded-lg"
            >
              Create Account
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
          >
            <Dialog open={editDialogOpen && editingContact?.id === contact.id} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <div 
                  className="flex items-center flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg p-2 -m-2"
                  onClick={() => {
                    setEditingContact(contact);
                    setEditDialogOpen(true);
                  }}
                >
                  <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center mr-3">
                    <User className="text-white dark:text-black" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-black dark:text-black">{contact.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-700">{contact.relationship}</p>
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
                      value={newContact.name || contact.name}
                      onChange={(e) => {
                        setNewContact({ ...newContact, name: e.target.value });
                      }}
                      className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-phone" className="text-black dark:text-white">Phone</Label>
                    <Input
                      id="edit-phone"
                      type="tel"
                      value={newContact.phone || contact.phone}
                      onChange={(e) => {
                        setNewContact({ ...newContact, phone: e.target.value });
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
                        setEditingContact({
                          ...contact,
                          relationship: e.target.value
                        });
                      }}
                      className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-green-800 hover:bg-green-900 text-white"
                      onClick={() => {
                        setEditDialogOpen(false);
                        setEditingContact(null);
                      }}
                    >
                      OK
                    </Button>
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
                            No
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => {
                              removeContact(contact.id);
                              setEditDialogOpen(false);
                              setEditingContact(null);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Yes
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
      )}

      {/* User Account Modal */}
      <UserAccountClean
        isOpen={showUserAccount}
        onClose={() => setShowUserAccount(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          if (onLogin) onLogin(user);
          setShowUserAccount(false);
        }}
        onLogout={() => {}}
      />
    </section>
  );
}
