const BASE_URL = "http://localhost:8080"

const getToken = () => {
    return localStorage.getItem("token");
};

// Get Task

export const fetchTaskApi = async () => {

    const response = await fetch(`${BASE_URL}/tasks`, {
        headers : {
            Authorization : `Bearer ${getToken()}`,
        },
    });

    if(!response.ok) throw new Error("Failed to fetch tasks");

    return response.json();
};


// ADD Task

export const addTaskApi = async (title,description) => {

    const response = await fetch(`${BASE_URL}/tasks`, {
        method : "POST",
        headers : {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({title,description}),
    });

    if(!response.ok) throw new Error("Failed to add Task");

    return response.json();
};

// DELETE Task

export const deleteTaskApi = async (id) => {

    const response = await fetch(`${BASE_URL}/tasks/${id}`, {

        method : "DELETE",
        headers : {
            Authorization : `Bearer ${getToken()}`
        },
    });

    if(!response.ok) throw new Error("Failed to delete Task");
};

// TOGGLE Complete

export const toggleCompleteApi = async (id) => {

    const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
        method : "PATCH",
        headers : {
            Authorization : `Bearer ${getToken()}`,
        },
    });

    if(!response.ok) throw new Error("Failed to Toggle Complete");

    return response.json();
};

// Update Task

export const updateTaskApi = async (id, title, description) => {

    const response = await fetch(`${BASE_URL}/tasks/${id}`,{

        method : "PUT",
        headers : {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({title, description}),
    });

    if(!response.ok) throw new Error("Failed to Update Task");

    return response.json();
};