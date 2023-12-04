<template>
  <!--class created to later center on css-->
  <div class="container">
    <!-- class created to later change shape in css-->
    <div class="profilePicture">
      <!-- displays the picture if an image is selected from files, using prop client, comes from ChatGPT prompt descibed bellow under methods-->
      <img v-if="client.profilePicture" :src="client.profilePicture">
    </div>
    <!--putting space between the buttons-->
    <div class="flex justify-between mt-3 mr-30">
      <div>
        <!--utilized this source: https://stackoverflow.com/questions/3828554/how-to-allow-input-type-file-to-accept-only-image-files to create an input for the profile-->
        <input type="file" style="display: none" @change="uploadPicture" ref="inputFile" accept="image/*">
        <!--utilized button structure from Update and delete client buttons on the clientdetails.vue page-->
        <button @click="uploadPicture" type="button" class="bg-green-700 disabled:opacity-50 text-white rounded m-2"
            :disabled="user.role === 'viewer'">Upload/Update</button>
        <button @click="deletePicture" type="button" ref="deleteButton" class="bg-red-700 disabled:opacity-50 text-white rounded m-2"
            :disabled="user.role === 'viewer'">Delete</button>
      </div>
    </div>
  </div><br>
</template>

<script>
//import useLoggedInUserStore and useVuelidate in order to utilize the setup, in order to identify if the user is an editor or viewer, copied from clientdetails.vue
import useVuelidate from '@vuelidate/core'
import { useLoggedInUserStore } from "../store/loggedInUser"

export default {
  props: {
    //created a prop called client, which should be an object, binding the profile picture
    client: Object,
  },
  //copied setup functionallity from clientdetails.vue in order to validate user type
  setup() {
    const v$ = useVuelidate();
    const user = useLoggedInUserStore(); 
    return { v$, user };
  },
  methods: {
      // The code bellow was generated in ChatGPT. The prompt was "Can you write a static Vue.js method for uploading and deleting a profile picture, 
      // which will not require the use of any backend databases". I edited the code to work with my established buttons, changing the button names and in the template section above I added 
      // '<img v-if="client.profilePicture" :src="client.profilePicture">' which allowed me to actually show the profile picture once I selected it. I added 
      // the code 'this.$refs.inputFile.click();' from here: https://stackoverflow.com/questions/63030356/v-file-input-click-is-not-a-function, to establish the clicking funtionality.
      // I only used what was necessary in order to get the file upload and delete to work, nothing extra. What I learned was how the file uploading worked, utilzing filereader, fetching 
      // the file if i click the button and having the file show up due to the reader and setting the same profile using a null value when I wanted the picture to disappear
    uploadPicture(event) {
      this.$refs.inputFile.click();
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.client.profilePicture = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    deletePicture() {
      //this staticlly removes the picture from the profile, will be updated once access to backend has been established
      this.client.profilePicture = null;
    },
  },
};
</script>

<style scoped>
/*created css styling from source: https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profilePicture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
}

.profilePicture img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
