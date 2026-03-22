import { Search } from "lucide-react";
import useChatStore from "../store/useChatStore";
import { useEffect, useState, type ChangeEvent } from "react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import useDebounce from "../lib/useDebounce";
import UserCard from "./UserCard";

const ContactList = () => {
  const { getAllContacts, clearContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const [ searchValue, setSearchValue ] = useState('');
  
  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  useEffect(() => {
    if(debouncedSearchTerm) {
      getAllContacts(debouncedSearchTerm);
    } else {
      clearContacts();
    }
  }, [clearContacts, getAllContacts, debouncedSearchTerm]);
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search className="input-icon" />
        <input type="text" value={searchValue} onChange={handleSearch} className="input pl-9" placeholder="Найти контакт"/>
      </div>
      {isUsersLoading ? (
        <UsersLoadingSkeleton />
      ) : allContacts.map((contact) => (
        <UserCard key={contact.id} contact={contact} onClick={() => setSelectedUser(contact)}/>
      ))}
       
    </div>
  );
};

export default ContactList;