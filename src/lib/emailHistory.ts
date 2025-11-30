const EMAIL_HISTORY_KEY = "login_email_history";

export function getEmailHistory(): string[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(EMAIL_HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

export function addEmailToHistory(email: string) {
  if (typeof window === "undefined") return;
  let emails = getEmailHistory();
  if (!emails.includes(email)) {
    emails = [email, ...emails];
    emails = emails.slice(0, 5); // จำกัด 5 เมลล่าสุด
    localStorage.setItem(EMAIL_HISTORY_KEY, JSON.stringify(emails));
  }
}
