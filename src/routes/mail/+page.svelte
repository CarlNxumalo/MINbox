<script>
    import { Section, Contact } from 'flowbite-svelte-blocks';
    import { Search, Modal, Hr, Label, Input, Textarea, Button, Select, Checkbox, Card } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
    import { enhance } from '$app/forms';
    export let data;
    let formModal = false;

    function close(){
        formModal = false;
    }
    
</script>

<Section name="contact">
    <Modal bind:open={formModal}  autoclose={false} >
    <form class="space-y-8" method="POST" use:enhance on:submit={close}>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Email Lecturer</h3>
            <div>
                <Label class="space-y-2">
                    <span>Select a module</span>
                    <Select items={data.modules} name="module" class="mt-2" required/>
                </Label>
            </div> 
            <div>
                <Input id="subject" name="subject" placeholder="Subject" required />
            </div>
            <div>
                <Textarea  class="mt-2"id="body" name="body" rows="5" placeholder="Compose message" label="Your message" required />
            </div>
            <div  style="display: flex; justify-content: space-between;">
                <Checkbox  class="mt-2"name="private">Private email?</Checkbox>
                <Button class="mt-2" type="submit">Send email</Button>
            </div>
        </form>
    </Modal>

    <div class="flex gap-2">
        <Search size="md" />
        <Button class="!p-2.5">
          <SearchOutline class="w-5 h-5" />
        </Button>
    </div>
    <div class="flex gap-2">
        <Select name="moduleS" items={data.modules} class="mt-2" placeholder="Filter by module"/>
        <Button class="mt-2" on:click={() => (formModal = true)}>Email</Button>
    </div>
    
    {#each data.messages as m}
    <div style="display: flex; align-items:center; flex-direction: column;">
    <Card class="w-full max-w-3xl mt-2" style="box-sizing: border-box; width: 100%; padding:1rem">
        <div class="flex" style="display: flex; justify-content:space-between; align-items:baseline">
            <h6 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{m.subject}</h6>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{m.module_code}</p>
        </div>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Message: {m.body}</p>
        {#if m.reply}
        <hr style="margin: 0.4rem;">
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Reply: {m.reply}</p>
        {/if}
    </Card>
    </div>
    {/each}

</Section>

