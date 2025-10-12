import { invalidatePageCache } from "@/lib/common/page-server";

export async function invalidateContactsCache(contactId?: string) {
  await invalidatePageCache("contacts", ["/contacts"]);

  if (contactId) {
    await invalidatePageCache("contact-detail", [`/contacts/${contactId}`]);
  }
}
