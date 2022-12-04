import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import UserRow from "../components/UserRow";
import AuthContext from "../context/auth-context";
import { getAllUsersByCompanyId } from "../queries/userQueries";


function Users() {
  const {companyId} = useContext(AuthContext);
  const {loading, error, data} = useQuery(getAllUsersByCompanyId, {
    variables: {id: companyId}
  });

  if (error) {
    toast.error(error.message)
  }

  if (loading) {
    return <Spinner />
  }
  return (
    <>
    <div>
      <h1 className="text-2xl text-center pt-6 mb-6">All Users</h1>
      <div className="px-4">
        <table className="users-table read-only-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Products Added</th>
              <th>Tickets Made</th>
            </tr>
          </thead>
          <tbody>

            {!loading && data && data.getAllUsersByCompanyId.map((user, index) => (
                <UserRow key={user._id} userData={user} index={index} />
            )) }
            
            
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Users;
