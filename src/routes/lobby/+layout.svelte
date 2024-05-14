<script lang="ts">
    import { onMount } from "svelte";
    import type { Group } from "../../api/models/group";
    import { page } from "$app/stores";
    import '../styles/menus.css';

    let groups: Group[] = [];
    let token = "";

    onMount(async () => {
        const session = sessionStorage.getItem("token");
        if (session) {
            token = session;
            const response = await fetch("http://localhost:8000/groups/All", {
                method: "GET",
                headers: {
                    token: token,
                },
            });
            if (response.ok) {
                groups = await response.json();
            } else {
                console.error("Failed to fetch groups");
            }
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
