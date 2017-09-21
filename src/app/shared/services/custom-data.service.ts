import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import * as _ from 'lodash';

@Injectable()
export class CustomData extends Subject<CompleterItem[]> implements CompleterData {
    _contributors: User[] = [];
    type: string;
    constructor(private http: Http, private userService: UserService) {
        super();
    }
    public search(term: string): void {
        this.userService.searchContribuitor(term, term)
            .map((response: User[]) => {
                response = _.differenceBy(response, this._contributors, 'enrolment');
                const contributors: CompleterItem[] = response.map((user: any) => this.convertToItem(user));
                this.next(contributors);
            }).subscribe();
    }

    public cancel() {
        // Handle cancel
    }

    public convertToItem(data: any): CompleterItem | null {
        if (!data) {
            return null;
        }
        return {
            title: typeof data === 'string' ? data : `${data['enrolment']} - ${data['name']}`,
            originalObject: data
        } as CompleterItem;
    }
}
