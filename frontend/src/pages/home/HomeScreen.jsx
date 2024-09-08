import { useAuthStore } from "../../store/authUser"

const HomeScreen = () => {

  const {logout} = useAuthStore();

  return (
    <>
    <div className="relative h-screen text-white">
      
    </div>
    </>
  )
}

export default HomeScreen