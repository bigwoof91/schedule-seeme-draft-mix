// require mongoose
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 'use strict';

// build logic in ajax post to query AccountOwners for id and grab account info to display
// add/update linkedAccounts in Requester object
const RequesterLinkedAccountsSchema = new Schema({

});
// build logic in ajax post to query contractors for id and grab info to display


const SuperAdmin = new Schema({

});

const AgencyAdmin = new Schema({

});

const JobSiteSchema = new Schema({
    job_site: {
        location: String,
        address: String,
        contact: String,
        notes: String,
    }
});

const AppointmentsSchema = new Schema({
    status: {
        type: String,
        enum: ['new request', 'contractors_paged', 'contractor_accepted', 'contractor_assigned', 'contractor_confirmed', 'client_notified', 'client_confirmed', 'client_rejected'],
        default: 'reader'
    },
    date: String,
    start_time: String,
    end_time: String,
    total_fee: Number,
    contractor: {
        type: Schema.Types.ObjectId,
        ref: 'Contractors',
        start_time: String,
        end_time: String,
        fee: Number
    },
    consumer: {
        fist_name: String,
        last_initial: String
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
    pwd: String, //hashed
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

// a: Account owner 99% of the time will be the requester
// q: what can account owner do that requester cannot:
// a: invite requesters |  view billing information | edit billing information |
const AccountOwnersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    phone: String,
    pwd: String, //hashed
    job_sites: [{
        job_site: {
            type: Schema.Types.ObjectId,
            ref: "JobSites"
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
    appointments: [{
        appointment: {
            type: Schema.Types.ObjectId,
            ref: "Appointments"
        }
    }],
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
    pwd: String,
    company_name: String,
    linked_accounts: [{
        linked_account: {
            type: Schema.Types.ObjectId, //what will the Requester view from linked account // simply allows requester to request on behalf of?
            ref: "AccountOwners"
        }
    }],
    job_sites: [{
        job_site: {
            type: Schema.Types.ObjectId,
            ref: "JobSites"
        }
    }],
    preferences: {
        contractors: Array,
        notes: Array
    },
    appointments: [{
        appointment: {
            type: Schema.Types.ObjectId,
            ref: "Appointments"
        }
    }],
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
    pwd: String,

    scheduled_appointments: [{
        appointment: {
            type: Schema.Types.ObjectId,
            ref: 'Appointments'
        }
    }],
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
    fee: Number,
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
    pwd: String,
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


const JobSites = mongoose.model('JobSites', JobSiteSchema);
const AgencyScheduler = mongoose.model('AgencySchedulers', AgencySchedulersSchema);
const Appointments = mongoose.model('Appointments', AppointmentsSchema);
const Requesters = mongoose.model('Requesters', RequestersSchema);
const AccountOwners = mongoose.model('AccountOwners', AccountOwnersSchema);
const Contractors = mongoose.model('Contractors', ContractorsSchema);
const Consumers = mongoose.model('Consumers', ConsumersSchema);
const RequesterLinkedAccounts = mongoose.model('AccountOwners', AccountOwnersSchema);
const Users = mongoose.model('Users', UsersSchema);

module.exports = JobSites;
module.exports = AgencyScheduler;
module.exports = Appointments;
module.exports = Requesters;
module.exports = AccountOwners;
module.exports = Contractors;
module.exports = Consumers;
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
//     pwd: String,
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