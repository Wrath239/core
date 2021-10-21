import { GoogleTranslator } from '../src/translators/GoogleTranslator';

// TODO: write tests for other translators

const commonTranslatorOptions = {
	headers: {
		// This is required for most translate services API
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
	},
};

test('test `translate` method', (done) => {
	const translator = new GoogleTranslator(commonTranslatorOptions);
	translator
		.translate('Hello world', 'en', 'ru')
		.then((translation) => {
			expect(typeof translation).toBe('string');
			expect(translation).toContain('мир');

			done();
		})
		.catch(done);
});

test('test `translateBatch` method', (done) => {
	const translator = new GoogleTranslator(commonTranslatorOptions);
	translator
		.translateBatch(['Hello world', 'my name is Jeff'], 'en', 'ru')
		.then((translation) => {
			expect(Array.isArray(translation)).toBe(true);
			expect(translation.length).toBe(2);

			expect(translation[0]).toContain('мир');
			expect(translation[1]).toContain('Джефф');

			done();
		})
		.catch(done);
});
