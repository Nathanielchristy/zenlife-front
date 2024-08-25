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
p, admin, notifications/*, (edit)|(show)
p, admin, notifications/*, field

p, EMPLOYEE, jobs, (list)|(create)
p, EMPLOYEE, jobs/*, (edit)|(show)
p, EMPLOYEE, jobs/hit, field, deny

p, ProjectCoordinator, jobs, (list)|(create)
p, ProjectCoordinator, jobs/*, (edit)|(show)
p, ProjectCoordinator, jobs/*, field

p, salescoordinator, jobs, (list)|(create)
p, salescoordinator, jobs/*, (edit)|(show)
p, salescoordinator, jobs/*, field

p, Designer, jobs, (list)|(create)
p, Designer, jobs/*, (edit)|(show)
p, Designer, jobs/*, field


p, Sales Executive, jobs, (list)|(create)
p, Sales Executive, jobs/*, (edit)|(show)
p, Sales Executive, jobs/*, field

p, Project Manager, jobs, (list)|(create)|(delete)
p, Project Manager, jobs/*, (edit)|(show)
p, Project Manager, jobs/*, field

p, Production, jobs, (list)
p, Production, jobs/*, (edit)|(show)
p, Production, jobs/*, field

p, Printer, jobs, (list)
p, Printer, jobs/*, (edit)|(show)
p, Printer, jobs/*, field



p, guest, authUser, login
`);
