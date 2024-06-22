import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, admin, jobs, (list)|(create)
p, admin, jobs/*, (edit)|(show)|(delete)
p, admin, jobs/*, field


p, admin, dashboard, (list)|(create)
p, admin, dashboard/*, (edit)|(show)|(delete)
p, admin, dashboard/*, field

p, admin, users, (list)|(create)
p, admin, users/*, (edit)|(show)|(delete)
p, admin, users/*, field

p, admin, notifications, (list)|(create)
p, admin, notifications/*, (edit)|(show)|(delete)
p, admin, notifications/*, field

p, EMPLOYEE, jobs, (list)|(create)
p, EMPLOYEE, jobs/*, (edit)|(show)
p, EMPLOYEE, jobs/hit, field, deny

p, ProjectCoordinator, jobs, (list)|(create)
p, ProjectCoordinator, jobs/*, (edit)|(show)|(delete)
p, ProjectCoordinator, jobs/*, field

p, salescoordinator, jobs, (list)|(create)
p, salescoordinator, jobs/*, (edit)|(show)|(delete)
p, salescoordinator, jobs/*, field

p, Designer, jobs, (list)|(create)
p, Designer, jobs/*, (edit)|(show)|(delete)
p, Designer, jobs/*, field

p, ProjectManager-Sales, jobs, (list)|(create)
p, ProjectManager-Sales, jobs/*, (edit)|(show)|(delete)
p, ProjectManager-Sales, jobs/*, field

p, Production, jobs, (list)|(create)
p, Production, jobs/*, (edit)|(show)|(delete)
p, Production, jobs/*, field

p, Printer, jobs, (list)|(create)
p, Printer, jobs/*, (edit)|(show)|(delete)
p, Printer, jobs/*, field



p, guest, authUser, login
`);
