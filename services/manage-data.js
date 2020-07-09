let dataThank = null;
// let userProfile = null;
let showForm1 = null;
let showForm2 = null;
let hintNumSendSlip = 0;
let updateProfile = false;

const manageData = {

    setDataThank(data) {
        dataThank = data;
    },
    getDataThank() {
        return dataThank;
    },
    clearDataThank() {
        dataThank = null;
    },

    // setUserProfile(data) {
    //     userProfile = data;
    // },
    // getUserProfile() {
    //     return userProfile;
    // },
    // clearUserProfile() {
    //     userProfile = null;
    // },

    setShowForm(d1, d2) {
        showForm1 = d1;
        showForm2 = d2;
    },
    getShowForm1() {
        return showForm1;
    },
    getShowForm2() {
        return showForm2;
    },
    clearShowForm() {
        showForm1 = null;
        showForm2 = null;
    },
    setHintNumSendSlip(num) {
        hintNumSendSlip = num;
    },
    getHintNumSendSlip() {
        return hintNumSendSlip;
    },

    getUpdateProfile() {
        return updateProfile;
    },
    updateUploadProfile(status) {
        updateProfile = status;
    }
}

export default manageData;