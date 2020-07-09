import axios from "axios";
// import moment from "moment";
import conf from '../config/config.json'
import utilResource from './util'
const ip = `${conf.donation_api.conn_type}${conf.donation_api.ip}${conf.donation_api.port}`
let ip2 = "";
if (!conf.is_has_partner_id) {
    ip2 = `${conf.donation_api_sum.conn_type}${conf.donation_api_sum.ip}${conf.donation_api_sum.port}`;
} else {
    ip2 = ip;
}
const memberPath = `${conf.member_path}`
const apiService = {
    onGetEmailAuth(req) {
        let options = utilResource.getHeaderNoLogin();
        return axios.post(`${ip2}/${memberPath}/v1/auth-email`, req, options)
    },
    onGetFacebookAuth(facebookToken) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip2}/${memberPath}/v1/auth-facebook?access_token=${facebookToken}`, options)
    },
    onGetGoogleAuth(googleToken) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip2}/${memberPath}/v1/auth-google?access_token=${googleToken}`, options);
    },
    onGetCheckEmail(email) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip2}/${memberPath}/v1/members/check-email?email=${email}`, options)
    },
    onPutChangePassword(req, memberId) {
        let options = utilResource.getHeaderLoginMMF();
        return axios.put(`${ip2}/${memberPath}/v1/members/${memberId}/change-password`, req, options);
    },
    onPatchMember(req) {
        let options = utilResource.getHeaderLoginMMF();
        return axios.patch(`${ip2}/${memberPath}/v1/members/me`, req, options);
    },
    onGetProfile() {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip2}/${memberPath}/v1/members/me`, options)
    },
    onGetProjectAll(limit, offset, publishStartDate, publishEndDate) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip}/dmf/v1/projects?limit=${limit}&offset=${offset}&isPublish=true&publishStartDate=${publishStartDate}&publishEndDate=${publishEndDate}`, options)
    },
    onGetProject(projectType, limit, offset) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip}/dmf/v1/projects?projectType=${projectType}&limit=${limit}&offset=${offset}&isPublish=true`, options)
    },
    onGetProjectPopular(limit, offset) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip}/dmf/v1/projects/popular?limit=${limit}&offset=${offset}`, options)
        // return axios.get(`${ip}/dmf/v1/projects/popular?limit=${limit}&offset=${offset}&status=active&isPublish=true&publishStartDate=${publishStartDate}&publishEndDate=${publishEndDate}`, options)
    },
    onGetProjectByCategory(categoryId, limit, offset, publishStartDate, publishEndDate) {
        let options = utilResource.getHeaderNoLogin();

        return axios.get(`${ip}/dmf/v1/projects?categoryId=${categoryId}&limit=${limit}&offset=${offset}&isPublish=true&publishStartDate=${publishStartDate}&publishEndDate=${publishEndDate}`, options)
    },
    onGetProjectById(projectId) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip}/dmf/v1/projects/${projectId}`, options)
    },
    onGetProjectDescById(projectId) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip}/dmf/v1/projectdesc?projectId=${projectId}&orderBy=runningNo:asc`, options)
    },
    onGetPlanById(projectId) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip}/dmf/v1/plans?projectId=${projectId}&orderBy=runningNo:asc`, options)
    },
    onGetEventById(projectId) {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip}/dmf/v1/events?projectId=${projectId}`, options)
    },
    onGetCategory() {
        let options = utilResource.getHeaderNoLogin();
        return axios.get(`${ip}/dmf/v1/category?isActive=true`, options)
    },
    onGetDonator() {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donator`, options)
    },
    onGetDonateChoiceByProject(projectId) {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donatechoices?projectId=${projectId}&orderBy=amount:asc`, options)
    },
    onGetBankAccount() {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/bankaccount?isActive=true`, options)
    },
    onGetGeographies() {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip2}/${conf.location_path}/v1/geographies`, options)
    },
    onGetDonation(limit, offset) {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donation?limit=${limit}&offset=${offset}`, options)
    },
    onGetDonationByStatus(limit, offset, status, userId) {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donation?limit=${limit}&offset=${offset}&status=${status}&userId=${userId}&method=Transfer`, options)
    },
    onGetDonationByDate(limit, offset, dateStart, dateEnd, userId) {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donation?limit=${limit}&offset=${offset}&createdFrom=${dateStart}&createdTo=${dateEnd}&userId=${userId}`, options)
    },
    onGetDonationByDateAndStatus(limit, offset, dateStart, dateEnd, userId, status) {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donation?limit=${limit}&offset=${offset}&createdFrom=${dateStart}&createdTo=${dateEnd}&status=${status}&userId=${userId}`, options)
    },
    onGetDonationById(donationId) {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donation?donationId=${donationId}`, options)
    },
    onGetDonationByOrderId(orderId) {
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donation?orderId=${orderId}`, options)
    },
    onGetDonationByProjectId(projectId, limit, offset) {
        // let options = utilResource.getHeaderNoLogin();
        let options = utilResource.getHeaderLogin();
        return axios.get(`${ip}/dmf/v1/donation?projectId=${projectId}&status=success,processing&limit=${limit}&offset=${offset}`, options)
    },
    onPostDonation(req) {
        let options = utilResource.getHeaderLogin();
        return axios.post(`${ip}/dmf/v1/donation`, req, options)
    },
    onPutDonation(req, donationId) {
        let options = utilResource.getHeaderLogin();
        return axios.put(`${ip}/dmf/v1/donation/${donationId}`, req, options)
    },
    onPostPaymentHandling(req, donationId) {
        let options = utilResource.getHeaderLogin();
        return axios.post(`${ip}/dmf/v1/payment/${donationId}`, req, options)
    },
    onPostDonator(req) {
        let options = utilResource.getHeaderLogin();
        return axios.post(`${ip}/dmf/v1/donator`, req, options)
    },
    onPutDonator(req, donatorId) {
        let options = utilResource.getHeaderLogin();
        return axios.put(`${ip}/dmf/v1/donator/${donatorId}`, req, options)
    },
    onPostSignup(req) {
        let options = utilResource.getHeaderNoLogin();
        return axios.post(`${ip2}/${memberPath}/v1/signup`, req, options)
    },
    onReq2c2p(req) {
        let options = {
            headers: { "Content-Type": "application/json", "Cache-Control": 'no-cache' },
        }
        let formData = new FormData();
        formData.append("PaymentRequest", req.PaymentRequest)
        return axios.post(`${conf.pay_2c2p.url}`, formData, options)
    },
    onPutWebhook(uniqueTransactionCode, req) {
        let options = utilResource.getHeaderLogin();
        return axios.put(`${ip}/dmf/v1/webhook?uniqueTransactionCode=${uniqueTransactionCode}`, req, options);
    }
}
export default apiService