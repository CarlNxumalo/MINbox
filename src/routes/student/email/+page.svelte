<script>
    import { Section } from "flowbite-svelte-blocks";
    import { Label, Input, Button, Select, Textarea, Checkbox, Modal, P } from "flowbite-svelte";
    export let data;
    export let form;
    let popupModal = false;
    if(form?.message != undefined){
        popupModal = true;
    }
</script>

<Modal title='Email Message' bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
     <!--<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" /> --> 
      <P whitespace="preline" class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{form?.message}</P>
      <!--Has a success button to redirect to MailBox-->
      <Button color="alternative" on:click={() => (popupModal = false)}>Ok</Button>
    </div>
</Modal>
<Section name="contact">
      <!--<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>-->
      <form class="space-y-8" method="POST">
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
                <Button class="mt-2" type="submit"  outline>Send email</Button>
            </div>
    </form>
</Section>