import { useAuth } from "../contexts/authentication";

function Logout() {
  const { logout } = useAuth();
  console.log(logout);
  return (
    <div>
      Logout
      <button
        className="flex pt-2 p-2 border-t border-grey300 hover:bg-[#EFEFF2] hover:text-[#232630]"
        onClick={logout}
      >
        <span></span>ออกจากระบบ
      </button>
    </div>
  );
}

export default Logout;
