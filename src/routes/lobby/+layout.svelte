<script lang="ts">
    import { onMount } from "svelte";
    import { invalidate, invalidateAll } from "$app/navigation";
    import type { Group, GroupRequest } from "../../api/models/group";
    import { Groups } from "../../api/roots/api_services";
    import { ErrToken } from "../../api/roots/err_types";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import '../styles/menus.css';
  import OkCancelModal from "../components/Globals/OKCancelModal.svelte";

    let groups: Group[] = [];
    let token = "";

    $: {fetchGroups();}

    async function fetchGroups() {
        const session = sessionStorage.getItem("token");
        if (session) {
            token = session;
            const groups_res = await Groups.getUserGroups(token);
            if (groups_res === ErrToken.NOT_GIVEN_TOKEN || groups_res === ErrToken.NOT_VALID_TOKEN) {
                alert('La sesión caducó, ¡Vuelva a iniciar sesión!');
                sessionStorage.clear();
                goto('/');
                return;
            }

            groups = groups_res;
        }
    }

    const deleteSession = () => {
        sessionStorage.clear();
    };

    let showModal = false
    let groupName = ''

    const createNewGroup = async() => {

        if (groupName.length === 0) {
            alert('Especifique el nombre del grupo');
            return;
        }

        const groupRequest : GroupRequest = {
            name : groupName
        }

        const response = await fetch('http://localhost:8000/groups/create', {
            method: 'POST',
            headers : {
                token : token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(groupRequest)
        })

        if (response.ok) {
            groupName = ''
            showModal = false
            invalidateAll()
            await fetchGroups()
        }
    }
</script>

<svelte:head>
    <title>TeamTalk | lobby</title>
    <meta name="description" content="TeamTalk {$page.url.pathname}" />
</svelte:head>
<div class="flex">
    <aside class="w-1/5 menu leftsidemenu">
        <a class="section_name" href="/lobby">Lobby</a>
        <div class="channelmenu">
            {#each groups as group}
            <a class="channel_button" href={`/lobby/${group.id}`}> {group.name} </a>
            {/each}
        </div>

        <button class="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" on:click={()=>{showModal = true}}>
            Crear grupo nuevo
        </button>
        <a class="menu_option" href="/" on:click={deleteSession}>Logout</a>
    </aside>
    <main class="w-4/5 overflow-auto h-screen menu rightsidemenu">
        <slot />
    </main>
</div>

{#if showModal}
    <OkCancelModal
        title="Crear un grupo nuevo" oklabel="Crear" cancelLabel="Cancelar"
        whenOk={createNewGroup}
        whenCancel={() => {showModal = false}}>
        <form on:submit|preventDefault={createNewGroup}>
            <label for="groupName" placeholder='Nombre de grupo'>Nombre del grupo:</label>
            <input id="groupName" bind:value={groupName} required class="text-black"/>
        </form>
    </OkCancelModal>
{/if}