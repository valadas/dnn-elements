import { r as registerInstance, e as createEvent, h, f as Host } from './index-b89da9ee.js';

const dnnPermissionsGridCss = ":host{display:block}.add-role-row{display:flex;gap:1em;align-items:center;flex-wrap:wrap}.add-role-row label{margin-right:0.5em}.search-user{display:flex;gap:1em;margin-top:1em}.search-user .search-control{position:relative}.search-user .search-control dnn-collapsible{position:absolute;left:0;top:calc(100% - 2px);width:100%;box-shadow:0px 4px 4px}.search-user .search-control dnn-collapsible .dropdown{background-color:white;border:1px solid lightgray;display:flex;flex-direction:column}.search-user .search-control dnn-collapsible .dropdown button{background-color:transparent;border:none;border-bottom:1px solid lightgray;padding:0.25em;margin:0;text-align:left}table{border:1px solid lightgray;border-collapse:collapse;margin-top:1em}table thead{text-align:center}table thead tr{border-bottom:1px solid lightgray}table thead th{background-color:lightgray;padding:0.25em 0.5em}table thead th:first-child{border-right:1px solid lightgray}table tbody tr{border-bottom:1px dotted lightgray}table tbody tr th{text-align:left;border-right:1px solid lightgray;padding:0 0.5em}table tbody tr td{text-align:center}table tbody tr td dnn-checkbox span{display:none}table tbody tr td button{background-color:transparent;border:0;padding:0;margin:0;margin-right:1em}";

const DnnPermissionsGrid = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.userSearchQueryChanged = createEvent(this, "userSearchQueryChanged", 7);
    this.permissionsChanged = createEvent(this, "permissionsChanged", 7);
    /** Optionally allows localizing the component strings. */
    this.resx = {
      Add: "Add",
      AllRoles: "All Roles",
      FilterByGroup: "Filter By Group",
      GlobalRoles: "Global Roles",
      Role: "Role",
      RolePermissions: "Role Permissions",
      SelectRole: "Select Role",
      User: "User",
      UserPermissions: "User Permissions",
    };
    /** The list of users to show under the search users field when a search is performed. */
    this.foundUsers = [];
    this.selectedRoleGroupId = -1;
  }
  handleFoundUsersChanged(newValue) {
    if ((newValue === null || newValue === void 0 ? void 0 : newValue.length) > 0) {
      setTimeout(() => {
        this.userCollapsible.expanded = true;
      }, 100);
    }
  }
  componentWillLoad() {
    document.addEventListener("click", this.dismissUserResults.bind(this));
  }
  disconnectedCallback() {
    document.removeEventListener("click", this.disconnectedCallback.bind(this));
  }
  dismissUserResults(e) {
    const dropdownRect = this.roleDropDown.getBoundingClientRect();
    if (e.pageX > dropdownRect.right ||
      e.pageX < dropdownRect.left ||
      e.pageY > dropdownRect.bottom ||
      e.pageY < dropdownRect.top) {
      this.userCollapsible.expanded = false;
    }
  }
  handleRoleGroupChanged(dropdown) {
    const index = dropdown.selectedIndex;
    const value = Number.parseInt(dropdown.options[index].value);
    this.selectedRoleGroupId = value;
  }
  addRole() {
    const roleId = Number.parseInt(this.roleDropDown.options[this.roleDropDown.selectedIndex].value);
    const role = this.roles.filter(r => r.RoleId == roleId)[0];
    this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
        ...this.permissions.rolePermissions,
        {
          default: false,
          locked: false,
          permissions: [],
          roleId: role.RoleId,
          roleName: role.RoleName,
        }
      ] });
    this.permissionsChanged.emit(this.permissions);
  }
  addUser() {
    if (this.pickedUser != undefined) {
      this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
          ...this.permissions.userPermissions,
          {
            displayName: this.pickedUser.displayName,
            permissions: [],
            userId: this.pickedUser.userId,
          },
        ] });
      this.pickedUser = undefined;
      this.userQuery = "";
      this.permissionsChanged.emit(this.permissions);
    }
  }
  getRoles() {
    const filteredRoles = this.roles.filter(role => !this.permissions.rolePermissions.some(rp => rp.roleId == role.RoleId));
    if (this.selectedRoleGroupId == -2) {
      // All Roles
      return filteredRoles;
    }
    if (this.selectedRoleGroupId == -1) {
      // Global Roles
      return filteredRoles.filter(role => role.IsSystemRole);
    }
    return filteredRoles.filter(role => role.RoleGroupId == this.selectedRoleGroupId);
  }
  renderRoleCheckBox(rolePermission, permissionDefinition) {
    const item = rolePermission.permissions.filter(permission => permission.permissionId == permissionDefinition.permissionId)[0];
    if (rolePermission.locked) {
      return (h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("g", { fill: "none" }, h("path", { d: "M0 0h24v24H0V0z" }), h("path", { d: "M0 0h24v24H0V0z", opacity: ".87" })), h("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" })));
    }
    const checked = item == undefined ? "intermediate" : item.allowAccess ? "checked" : "unchecked";
    return (h("dnn-checkbox", { "use-intermediate": true, checked: checked, onCheckedchange: e => this.handleRoleChanged(e.detail, rolePermission, permissionDefinition) }, h("div", { slot: "intermediateicon" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), h("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }))), h("div", { slot: "uncheckedicon" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), h("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" }))), h("span", null, permissionDefinition.permissionName)));
  }
  renderUserCheckBox(userPermission, permissionDefinition) {
    const item = userPermission.permissions.filter(permission => permission.permissionId == permissionDefinition.permissionId)[0];
    const checked = item == undefined ? "intermediate" : item.allowAccess ? "checked" : "unchecked";
    return (h("dnn-checkbox", { "use-intermediate": true, checked: checked, onCheckedchange: e => this.handleUserChanged(e.detail, userPermission, permissionDefinition) }, h("div", { slot: "intermediateicon" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), h("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }))), h("div", { slot: "uncheckedicon" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), h("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" }))), h("span", null, permissionDefinition.permissionName)));
  }
  handleRoleChanged(checked, rolePermission, permissionDefinition) {
    switch (checked) {
      case "unchecked":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
            ...this.permissions.rolePermissions.map(r => {
              if (r.roleId != rolePermission.roleId) {
                return r;
              }
              const newRolePermission = Object.assign({}, r);
              newRolePermission.permissions = [
                ...newRolePermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
                {
                  allowAccess: false,
                  fullControl: false,
                  permissionCode: permissionDefinition.permissionCode,
                  permissionId: permissionDefinition.permissionId,
                  permissionKey: permissionDefinition.permissionKey,
                  permissionName: permissionDefinition.permissionName,
                  view: false,
                },
              ];
              return newRolePermission;
            }),
          ] });
        break;
      case "checked":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
            ...this.permissions.rolePermissions.map(r => {
              if (r.roleId != rolePermission.roleId) {
                return r;
              }
              const newRolePermission = Object.assign({}, r);
              newRolePermission.permissions = [
                ...newRolePermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
                {
                  allowAccess: true,
                  fullControl: false,
                  permissionCode: permissionDefinition.permissionCode,
                  permissionId: permissionDefinition.permissionId,
                  permissionKey: permissionDefinition.permissionKey,
                  permissionName: permissionDefinition.permissionName,
                  view: false,
                },
              ];
              return newRolePermission;
            }),
          ] });
        break;
      case "intermediate":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
            ...this.permissions.rolePermissions.map(r => {
              if (r.roleId != rolePermission.roleId) {
                return r;
              }
              const newRolePermission = Object.assign({}, r);
              newRolePermission.permissions = [
                ...newRolePermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
              ];
              return newRolePermission;
            }),
          ] });
        break;
      default:
        break;
    }
    this.permissionsChanged.emit(this.permissions);
  }
  handleUserChanged(checked, userPermission, permissionDefinition) {
    switch (checked) {
      case "unchecked":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
            ...this.permissions.userPermissions.map(u => {
              if (u.userId != userPermission.userId) {
                return u;
              }
              const newUserPermission = Object.assign({}, u);
              newUserPermission.permissions = [
                ...newUserPermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
                {
                  allowAccess: false,
                  fullControl: false,
                  permissionCode: permissionDefinition.permissionCode,
                  permissionId: permissionDefinition.permissionId,
                  permissionKey: permissionDefinition.permissionKey,
                  permissionName: permissionDefinition.permissionName,
                  view: false,
                },
              ];
              return newUserPermission;
            }),
          ] });
        break;
      case "checked":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
            ...this.permissions.userPermissions.map(u => {
              if (u.userId != userPermission.userId) {
                return u;
              }
              const newUserPermission = Object.assign({}, u);
              newUserPermission.permissions = [
                ...newUserPermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
                {
                  allowAccess: true,
                  fullControl: false,
                  permissionCode: permissionDefinition.permissionCode,
                  permissionId: permissionDefinition.permissionId,
                  permissionKey: permissionDefinition.permissionKey,
                  permissionName: permissionDefinition.permissionName,
                  view: false,
                },
              ];
              return newUserPermission;
            }),
          ] });
        break;
      case "intermediate":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
            ...this.permissions.userPermissions.map(u => {
              if (u.userId != userPermission.userId) {
                return u;
              }
              const newUserPermission = Object.assign({}, u);
              newUserPermission.permissions = [
                ...newUserPermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
              ];
              return newUserPermission;
            }),
          ] });
        break;
      default:
        break;
    }
    this.permissionsChanged.emit(this.permissions);
  }
  removeRole(rolePermission) {
    this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
        ...this.permissions.rolePermissions.filter(rp => rp.roleId != rolePermission.roleId),
      ] });
    this.permissionsChanged.emit();
  }
  removeUser(userPermission) {
    this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
        ...this.permissions.userPermissions.filter(up => up.userId != userPermission.userId),
      ] });
    this.permissionsChanged.emit(this.permissions);
  }
  handleQueryChanged(query) {
    this.userQuery = query;
    if (query == undefined || query.length == 0) {
      this.userCollapsible.expanded = false;
      this.pickedUser = undefined;
      this.foundUsers = [];
      return;
    }
    this.userSearchQueryChanged.emit(query);
  }
  handleSearchUserFieldKeyDown(e) {
    if (e.key != "ArrowDown") {
      return;
    }
    e.preventDefault();
    const firstButton = this.userCollapsible.querySelector("button");
    if (firstButton != undefined) {
      firstButton.focus();
    }
  }
  handleSearchedUserKeyDown(e) {
    const button = e.target;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextButton = button.nextElementSibling;
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const previousButton = button.previousElementSibling;
        previousButton === null || previousButton === void 0 ? void 0 : previousButton.focus();
        break;
      default:
        break;
    }
  }
  handleUserPicked(searchedUser) {
    this.userQuery = searchedUser.displayName;
    this.pickedUser = searchedUser;
  }
  getFilteredUsers() {
    return this.foundUsers.filter(fu => !this.permissions.userPermissions.some(up => up.userId == fu.userId));
  }
  render() {
    const filteredRoles = this.getRoles();
    return (h(Host, null, h("div", { class: "add-role-row" }, h("div", { class: "dropdown" }, h("label", null, this.resx.FilterByGroup, " :"), h("select", { onChange: e => this.handleRoleGroupChanged(e.target) }, h("option", { value: -2, selected: this.selectedRoleGroupId == -2 }, this.resx.AllRoles), h("option", { value: -1, selected: this.selectedRoleGroupId == -1 }, this.resx.GlobalRoles), this.roleGroups.map(roleGroup => h("option", { value: roleGroup.id, selected: this.selectedRoleGroupId == roleGroup.id }, roleGroup.name)))), filteredRoles && filteredRoles.length > 0 && [
      h("div", { class: "dropdown" }, h("label", null, this.resx.SelectRole, " :"), h("select", { ref: el => this.roleDropDown = el }, this.getRoles().map(role => h("option", { value: role.RoleId }, role.RoleName)))),
      h("dnn-button", { type: "primary", onClick: () => this.addRole() }, this.resx.Add)
    ]), h("table", { class: "roles-table" }, h("caption", null, this.resx.RolePermissions), h("thead", null, h("tr", null, h("th", null, this.resx.Role), this.permissions.permissionDefinitions.map(permissionDefinition => h("th", null, permissionDefinition.permissionName)), h("th", null, "\u00A0"))), h("tbody", null, this.permissions.rolePermissions.map(rolePermission => h("tr", null, h("th", null, rolePermission.roleName), this.permissions.permissionDefinitions.map(permissionDefinition => h("td", null, this.renderRoleCheckBox(rolePermission, permissionDefinition))), h("td", null, !rolePermission.default &&
      h("button", { onClick: () => this.removeRole(rolePermission) }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), h("path", { d: "M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })))))))), h("div", { class: "search-user" }, h("div", { class: "search-control" }, h("dnn-searchbox", { placeholder: this.resx.User, debounced: true, onQueryChanged: e => this.handleQueryChanged(e.detail), onKeyDown: e => this.handleSearchUserFieldKeyDown(e), query: this.userQuery }), h("dnn-collapsible", { ref: el => this.userCollapsible = el }, h("div", { class: "dropdown" }, this.getFilteredUsers().map(searchedUser => h("button", { onKeyDown: e => this.handleSearchedUserKeyDown(e), onClick: () => this.handleUserPicked(searchedUser) }, searchedUser.displayName))))), this.pickedUser &&
      h("dnn-button", { onClick: () => this.addUser() }, this.resx.Add)), this.permissions.userPermissions && this.permissions.userPermissions.length > 0 &&
      h("table", { class: "users-table" }, h("caption", null, this.resx.UserPermissions), h("thead", null, h("tr", null, h("th", null, this.resx.User), this.permissions.permissionDefinitions.map(permissionDefinition => h("th", null, permissionDefinition.permissionName)), h("th", null, "\u00A0"))), h("tbody", null, this.permissions.userPermissions.map(userPermission => h("tr", null, h("th", null, userPermission.displayName), this.permissions.permissionDefinitions.map(permissionDefinition => h("td", null, this.renderUserCheckBox(userPermission, permissionDefinition))), h("td", null, h("button", { onClick: () => this.removeUser(userPermission) }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), h("path", { d: "M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }))))))))));
  }
  static get watchers() { return {
    "foundUsers": ["handleFoundUsersChanged"]
  }; }
};
DnnPermissionsGrid.style = dnnPermissionsGridCss;

export { DnnPermissionsGrid as dnn_permissions_grid };

//# sourceMappingURL=dnn-permissions-grid.entry.js.map