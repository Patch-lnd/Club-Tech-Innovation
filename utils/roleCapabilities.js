// Defines what each role is allowed to do within the application

module.exports = {
    member: {
        canEditProfile: true,
        canUploadAvatar: true,
        canCreatProject: true,
        canEditOwnProject: true,
        canDeleteOwnProject: true,
        canModerateProjects: false,
        canEditWebsiteContent: false,
        canManageMembers: false,
    },
    admin: {
        conEditProfile: true,
        canUploadAvatar: true,
        canCreatProject: true,
        canEditOwnProject: true,
        canDeleteOwnProject: true,

        canModerateProjects: true,
        canEditWebsiteContent: true,
        canManageMembers: true,
    },
    master:{
         conEditProfile: true,
        canUploadAvatar: true,
        canCreatProject: true,
        canEditOwnProject: true,
        canDeleteOwnProject: true,

        canModerateProjects: true,
        canEditWebsiteContent: true,
        canManageMembers: true,
          canManageAdmin: true,
    }
}