import React from 'react'

function EditRole() {
   const updateRole = async (role) => {
        const response = await fetch(`/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(role),
        });
        return response.json();
      };

   const handleEdit=async (e)=>{
    e.preventDefault();
    
    let role = { email: "xyz@gmail.com", isVolunteer: true, isAdmin: true };

    const updatedrole=await updateRole(role);
   }

    return (
      <button
        className="btn btn-primary btn-block"
        onClick={handleEdit}
      >
        Edit role
      </button>
    );
}

export default EditRole