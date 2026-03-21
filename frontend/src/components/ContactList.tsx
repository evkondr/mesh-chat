import { Search } from "lucide-react";

const ContactList = () => {
  return (
    <div>
      <div className="relative">
        <Search className="input-icon" />
        <input type="text" className="input pl-9" placeholder="Найти контакт"/>
      </div>
    </div>
  );
};

export default ContactList;