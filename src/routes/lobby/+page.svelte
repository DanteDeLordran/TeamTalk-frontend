<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import type { UserRequest } from '../../api/models/user.js';

    export let data
    const updateData = async() => {

        const userRequest : UserRequest = {
            name: data.user.name,
            lastname: data.user.lastname,
            email: data.user.email,
            username: data.user.username
        }

        const response = await fetch('http://localhost:8000/users/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: data.token
            },
            body: JSON.stringify(userRequest)
        });
        
        if (response.ok) {
            invalidateAll()
        }
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold mb-4">Este es tu perfil</h1>

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input id="username" bind:value={data.user.username} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"/>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
            </label>
            <input id="email" bind:value={data.user.email} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"/>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Name
            </label>
            <input id="name" bind:value={data.user.name} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"/>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
                Last Name
            </label>
            <input id="lastname" bind:value={data.user.lastname} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"/>
        </div>
        <button on:click={updateData} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
        </button>
    </div>
</div>
