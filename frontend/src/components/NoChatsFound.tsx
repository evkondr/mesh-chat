import { MessageCircleIcon } from "lucide-react";
import useChatStore from "../store/useChatStore";

const NoChatsFound = () => {
  const { setActiveTab } = useChatStore();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">Еще нет бесед</h4>
        <p className="text-slate-400 text-sm px-6">
          Чтобы начать новый чат, выберите контакт на вкладке «Контакты».
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors"
      >
        Найти контакты
      </button>
    </div>
  );
};

export default NoChatsFound;