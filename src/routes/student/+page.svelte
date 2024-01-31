<script>
    import { Section, Contact } from 'flowbite-svelte-blocks';
    import { Search, Modal, Hr, Label, Input, Textarea, Button, Select, Checkbox, Card, P } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
    import { enhance } from '$app/forms';
    export let data;
    export let form;


    if(form){
        data.messages = form.messages
        data.selectedModule = form.selectedModule
        data.search = form.search
    }
    //console.log(data.messages)

    function submitForm() {
        document.getElementById('myForm').submit();
    }

    let popupModal = false;
    if(form?.error != undefined){
        popupModal = true;
    }
</script>
<Modal title='MINbox mail proccess error:' bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
     <!--<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" /> --> 
      <P whitespace="preline" class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{form?.error}</P>
      <Button color="alternative" on:click={() => (popupModal = false)}>Ok</Button>
    </div>
</Modal>

<Section name="contact">
   
    <form action="?/AISearch" method="POST">
        <div class="flex gap-2">
            <Search size="md" name="search" placeholder={(data?.search)? data?.search: "AI Search..."} required/>
            <Button name="module" value={data.selectedModule} class="!p-2.5" type="submit">
            <SearchOutline class="w-5 h-5" />
            </Button>
        </div>
    </form>
    <form action="?/ByModule" method="POST" id = "myForm" use:enhance>
        <div class="flex gap-2">
            {#if data?.selectedModule}
            <Select name="module"  value={data.selectedModule} on:change={submitForm} items={data.modules} class="mt-2" placeholder="Filter by module"/>
            {:else}
            <Select name="module"  on:change={submitForm} items={data.modules} class="mt-2" placeholder="Filter by module"/>
            {/if}
            <Button class="mt-2" href="/student/email" outline>Email</Button>
        </div>
    </form>
    
    {#each data.messages as m}
    <div style="display: flex; align-items:center; flex-direction: column;">
    <Card class="w-full max-w-3xl mt-2" style="box-sizing: border-box; width: 100%; padding:1rem"  href="./student/email/{m.id}" data-sveltekit-preload-data="off">
        <div class="flex" style="display: flex; justify-content:space-between; align-items:baseline">
            <h6 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{m.subject}</h6>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{m.module_code}</p>
        </div>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight truncate">Message: {m.message}</p>
        {#if m.reply}
        <hr style="margin: 0.4rem;">
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight truncate">Reply: {m.reply}</p>
        {/if}
    </Card>
    </div>
    {/each}
</Section>


