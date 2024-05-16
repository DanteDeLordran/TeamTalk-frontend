<script lang="ts">
    import { onMount } from "svelte";
    import type { Group } from "../../api/models/group";
    import { page } from "$app/stores";
    import '../styles/menus.css';
    import { Groups } from "../../api/roots/api_services";
    import { ErrToken } from "../../api/roots/err_types";
    import { goto } from "$app/navigation";

    let groups: Group[] = [];
    let token = "";

    onMount(async () => {
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
    });

    const deleteSession = () => {
        sessionStorage.clear();
    };
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

        <a class="menu_option" href="/" on:click={deleteSession}>Logout</a>
    </aside>
    <main class="w-4/5 overflow-auto h-screen menu rightsidemenu">
        <slot />
    </main>
</div>
