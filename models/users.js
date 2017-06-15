// require mongoose
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 'use strict';

// build logic in ajax post to query AccountOwners for id and grab account info to display
// add/update linkedAccounts in Requester object
const RequesterLinkedAccountsSchema = new Schema({

});
// build logic in ajax post to query contractors for id and grab info to display
const AssignedContractors = new Schema({

});

const SuperAdmin = new Schema({

});

const AgencyAdmin = new Schema({

});

const AppointmentsSchema = new Schema({
    appointment: {
        status: {
            type: String,
            enum: ['new request', 'contractors_paged', 'contractor_accepted', 'contractor_assigned', 'contractor_confirmed', 'client_notified', 'client_confirmed', 'client_rejected'], // CR logic to onClick contr_paged excluding the previously hired contractor 
            default: 'reader'
        },
        // Go to notes for possible statuses // viable option: set object inside status with several properties and Booleans
        date: String,
        start_time: String,
        end_time: String,
        fee_per_day: Number,
        fee_per_contractor: Number,
        contractor: {
            type: Schema.Types.ObjectId,
            ref: 'AssignedContractors'
        },
        consumer: {
            fist_name: String,
            last_initial: String
        }
    }
});

const AgencySchedulersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: String, //hashed
    appointments: [{
        appointment: {
            type: Schema.Types.ObjectId,
            ref: "Appointments"
        }
    }],
    role: {
        type: String,
        default: "agency_scheduler"
    }
});

// q: What if account owner sets themself as the requester?
// a: Account owner 99% of the time will be the requester
// q: what can account owner do that requester cannot - analysis for creating SuperRequester role:
// a1: invite requesters |  view billing information | edit billing information |
const AccountOwnersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    phone: String,
    password: String, //hashed
    job_sites: [{
        job_site: {
            location: String,
            address: String,
            contact: String,
            notes: String,
        }
    }],
    billing_details: {
        company_name: String,
        billing_contact: {
            first_name: String,
            last_name: String
        },
        billing_email: String,
        billing_phone: String
    },
    preferences: {
        contractors: Array,
        notes: Array
    },
    appointments: {
        type: Schema.Types.ObjectId,
        ref: "Appointments"
    },
    role: {
        type: String,
        default: "account_owner"
    }
});

const RequestersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    phone: String,
    password: String,
    company_name: String,
    linked_accounts: [{
        linked_account: {
            type: Schema.Types.ObjectId, //what will the Requester view from linked account // simply allows requester to request on behalf of?
            ref: "RequesterLinkedAccounts"
        }
    }],
    job_sites: [{
        job_site: {
            location: String,
            address: String,
            contact: String,
            notes: String,
        }
    }],
    preferences: {
        contractors: Array,
        notes: Array
    },
    appointments: {
        type: Schema.Types.ObjectId,
        ref: "Appointments"
    },
    role: {
        type: String,
        default: "requester"
    }
});

const ContractorsSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    alternate_email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    phone_numbers: {
        primary: String,
        secondary: String
    },
    password: String,

    scheduled_appointments: {
        appointments: Array
    },
    creds: {
        highest_ed: String,
        rid_certs: Array,
        nad_level: String,
        nic_level: String,
        year_cert: Number,
        other_certs: String,
        other_lang: Array,
        insurance: {
            covered: {
                type: Boolean,
                default: 0
            },
            policy_num: String
        },
        int_exp: String,
        areas_not: String
    },
    role: {
        type: String,
        default: "contractor"
    }
});

const ConsumersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    phone: String,
    password: String,
    preferences: {
        contractors: Array,
        notes: Array
    },
    role: {
        type: String,
        default: "consumer"
    }
});

const UsersSchema = new Schema({
    AgencySchedulersSchema,
    AccountOwnersSchema,
    RequestersSchema,
    ContractorsSchema,
    ConsumersSchema
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;


// ConsumerSchema.plugin(mongooseRole, {
//     roles: ['super_admin', 'agency_admin', 'agency_scheduler', 'account_owner', 'requester', 'contractor', 'consumer', 'public'],
//     accessLevels: {
//         'public': ['public', 'consumer', 'requester', 'account_owner', 'agency_scheduler', 'admin', 'super_admin'],
//         'user': ['consumer', 'super_admin'],
//         'requester': ['requester', 'super_admin'],
//         'account_owner': ['account_owner', 'super_admin'],
//         'agency_scheduler': ['agency_scheduler', 'admin', 'super_admin'],
//         'agency_admin': ['admin', 'super_admin'],
//         'super_admin': ['super_admin']
//     }
// });

// // advise trashing a super requester role. Instead, just add a permission for requesters to invite requesters to have 'invite' functionality
// const SuperRequesterSchema = new Schema({
//     first_name: String,
//     last_name: String,
//     email: {
//         type: String,
//         unique: true,
//         match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
//     },
//     phone: String,
//     password: String,
//     company_name: String,
//     job_sites: [{
//         job_site: {
//             location: String,
//             address: String,
//             contact: String,
//             notes: String,
//         }
//     }],
//     linked_accounts: [{
//         linked_account: {
//             type: Schema.Types.ObjectId, //what will the SuperRequester view from linked account // once linked they will be able to do...? // simply invite requesters?
//             ref: "SuperRequesterLinkedAccounts"
//         }
//     }],
//     preferences: {
//         contractors: Array,
//         notes: Array
//     },
//     appointments: [{
//         appointment: {
//             status: String, // Go to notes for possible statuses // viable option: set object inside status with several properties and Booleans
//             date: String,
//             start_time: String,
//             end_time: String,
//             contractor: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'AssignedContractors'
//             },
//             consumer: String
//         }
//     }]
// });