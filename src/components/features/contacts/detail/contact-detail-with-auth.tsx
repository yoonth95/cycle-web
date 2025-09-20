"use client";

import { useState } from "react";
import {
  ContactDetailContent,
  PasswordProtectionWrapper,
} from "@/components/features/contacts/detail";
import { ContactWithComments } from "@/types/contact";

export function ContactDetailWithAuth({ contact }: { contact: ContactWithComments }) {
  const [isAuthenticated, setIsAuthenticated] = useState(contact.is_public);

  if (!isAuthenticated) {
    return (
      <PasswordProtectionWrapper
        contact={contact}
        onPasswordVerified={() => setIsAuthenticated(true)}
      />
    );
  }

  return <ContactDetailContent contact={contact} />;
}
