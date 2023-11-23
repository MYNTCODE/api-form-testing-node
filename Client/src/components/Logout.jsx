import { useAuth } from "../contexts/authentication";

function Logout() {
  const { logout } = useAuth();

  return (
    <div>
      <button
        className=" bg-red-400  flex pt-2 px-4 border-t border-grey300 hover:bg-[#EFEFF2] hover:text-[#232630]"
        onClick={logout}
      >
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Logout;
