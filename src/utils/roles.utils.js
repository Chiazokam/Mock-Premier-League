import AccessControl from 'accesscontrol';

const access = new AccessControl();

const roles = (() => {
  access.grant('user')
    .readAny('team')
    .readAny('fixture');

  access.grant('admin')
    .extend('user')
    .createAny('team')
    .createAny('fixture')
    .updateAny('team')
    .updateAny('fixture')
    .deleteAny('team')
    .deleteAny('fixture');
  return access;
})();

export default roles;
