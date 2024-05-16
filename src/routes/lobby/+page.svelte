<script lang="ts">
    import { invalidate, invalidateAll } from '$app/navigation';
    import type { GroupRequest } from '../../api/models/group.js';

    export let data
    let showModal = false
    let groupName = ''

    const createNewGroup = async() => {

        const groupRequest : GroupRequest = {
            name : groupName
        }

        const response = await fetch('http://localhost:8000/groups/create', {
            method: 'POST',
            headers : {
                token : data.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(groupRequest)
        })

        if (response.ok) {
            groupName = ''
            showModal = false
            invalidate('/lobby')
        }
    }
</script>

<div>
    <h1>Este es tu perfil</h1>

    <button class="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" on:click={()=>{showModal = true}}>
        Crear grupo nuevo
    </button>
</div>

{#if showModal}
    <div>
        <h2>Create New Group</h2>
        <form on:submit|preventDefault={createNewGroup}>
            <label for="groupName" placeholder='Nombre de grupo'>Group Name:</label>
            <input id="groupName" bind:value={groupName} required class="text-black"/>
            <button type="submit">Create</button>
        </form>
    </div>
{/if}