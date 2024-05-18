<script lang="ts">
    import './modals_components/modals.css';
    export let title: string = "";
    export let cancelLabel: string = "Cancel";
    export let oklabel: string = "Ok";
    export let whenCancel = () => {};
    export let whenOk = () => {};

</script>

<div class="modal">
    <h2>{title}</h2>
    <hr/>
    <div class="childrenContainer">
        <slot/>
    </div>
    <div class="buttonContainer">
        <button class="modalButton cancel" on:click={whenCancel}>{cancelLabel}</button>
        <button class="modalButton ok" on:click={whenOk}>{oklabel}</button>
    </div>
</div>