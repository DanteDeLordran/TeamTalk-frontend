<script lang="ts">
    import { onMount } from "svelte";
    import type { Group } from "../../api/models/group";

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
        sessionStorage.clear()
    }
</script>

<div>
    <aside>
        <a href="/lobby">Lobby</a>

        {#each groups as group}
            <a href={`/lobby/${group.name}`}> {group.name} </a>
        {/each}

        <a href="/" on:click={deleteSession}>Logout</a>
    </aside>
    <main>
        <slot />
    </main>
</div>
