import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { SetLanguageAction } from '../../store';

@Injectable()
export class AppLanguageService {

	langs = [LanguageCode.en, LanguageCode.de];
	defaultLang = LanguageCode.en;

	constructor(
		private store: Store<any>,
		private translate: TranslateService
	) {
		this.translate.addLangs(this.langs);
		this.translate.setDefaultLang(this.defaultLang);

		this.changeLanguage(this.getLanguageFromBrowser());
	}

	private getLanguageFromBrowser(): LanguageCode {
		const language = localStorage.getItem('language');
		if (language) {
			return language as LanguageCode;
		}
		else {
			const browserLang = this.translate.getBrowserLang();
			const languageToSelect = this.langs.includes(browserLang as LanguageCode) ? browserLang : this.defaultLang;
			return languageToSelect as LanguageCode;
		}
	}

	changeLanguage(language: LanguageCode) {
		localStorage.setItem('language', language);
		this.translate.use(language);
		this.store.dispatch(new SetLanguageAction(language));
	}
}

export enum LanguageCode {
	de = 'de',
	en = 'en',
	ja = 'ja',
	zh = 'zh'
}
