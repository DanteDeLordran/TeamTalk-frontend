<script lang="ts">
    import { onMount } from "svelte";
    import type { Group } from "../../api/models/group";
    import { page } from "$app/stores";

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
    <aside class="w-3/12">
        <ul>
            <a href="/lobby"><li>Lobby</li></a>

            {#each groups as group}
                <a href={`/lobby/${group.id}`}> <li>{group.name}</li> </a>
            {/each}

            <a href="/" on:click={deleteSession}><li>Logout</li></a>
        </ul>
    </aside>
    <main class="w-9/12">
        <slot />
    </main>
</div>
