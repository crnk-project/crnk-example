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
	}

	initAppLanguage(): void {
		let initialLanguage = this.defaultLang;
		const browserLang = this.translate.getBrowserLang();
		if (this.langs.includes(browserLang as LanguageCode)) {
			initialLanguage = browserLang as LanguageCode;
		}
		const storageLang = localStorage.getItem('language');
		if (storageLang) {
			initialLanguage = storageLang as LanguageCode;
		}

		this.changeLanguage(initialLanguage);
	}

	changeLanguage(language: LanguageCode) {
		this.store.dispatch(new SetLanguageAction(language));
	}
}

export enum LanguageCode {
	de = 'de',
	en = 'en',
	ja = 'ja',
	zh = 'zh'
}
