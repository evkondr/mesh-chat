import { useRef } from "react";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";
import { Loader, LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
const mouseClickSound = new Audio("/src/assets/sounds/mouse-click.mp3");
const ProfileHeader = () => {
  const { logout, authUser, updateProfile, isProfileUpdating } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  // const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    // setSelectedImg(file);
    updateProfile(file);
  };
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar avatar-online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={authUser?.profilePic || "/src/assets/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute rounded-full inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
              {isProfileUpdating && (
                <div className="absolute rounded-full inset-0 bg-black/50 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Loader className="animate-spin" />
                </div>
              )}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser?.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
          {/* SOUND TOGGLE BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;