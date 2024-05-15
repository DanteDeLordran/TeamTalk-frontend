<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import type { ChannelRequest } from "../../../api/models/group.js";

    export let data;

    let channelName = "";
    let showModal = false

    const createNewChannel = async () => {
        const channel: ChannelRequest = {
            group_id: data.groupId,
            channel_name: channelName,
        };

        const response = await fetch("http://localhost:8000/channels/create", {
            method: "POST",
            body: JSON.stringify(channel),
            headers: {
                "Content-Type": "application/json",
                token: data.token,
            },
        });
        if (response.ok) {
            channelName = ''
            invalidateAll()
            showModal = false
        }
    };
</script>

<h1>Grupo { data.groupId }</h1>

<h2>Canales</h2>

<button on:click={()=>{showModal = true}}>Crear canal nuevo</button>
<ul>
    {#each data.channels as channel}
        <a href={`/lobby/${data.groupId}/${channel.id}`}>
            <li>{channel.channel_name}</li>
        </a>
    {/each}
</ul>

{#if showModal}
    <div>
        <h2>Create New Channel</h2>
        <form on:submit|preventDefault={createNewChannel}>
            <label for="channelName">Channel Name:</label>
            <input id="channelName" bind:value={channelName} required />
            <button type="submit">Create</button>
        </form>
    </div>
{/if}