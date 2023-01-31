import { config } from 'apps/backoffice/src/config';
import ldap from 'ldapjs';

export class LdapService {
    constructor(private readonly client: any) {
        this.client = ldap.createClient({
            url: config.auth.ldap.url,
        });
    }

    async validate(username: string, password: string): Promise<boolean> {
        this.client.bind(username, password, function (err: any) {
            if (!err) {
                return true;
            }
        });
        return false;
    }
}
