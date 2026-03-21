import useChatStore from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="tabs tabs-box flex justify-center bg-transparent shadow shadow-transparent p-2 w-full  border-b border-slate-700/50 rounded-none">
      <button onClick={() => setActiveTab('chats')} className={`tab flex-1 ${
        activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
      }`}>
        Чаты
      </button>
      <button onClick={() => setActiveTab('contacts')}  className={`tab flex-1 ${
        activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
      }`}>
        Контакты
      </button>
    </div>
  );
};

export default ActiveTabSwitch;