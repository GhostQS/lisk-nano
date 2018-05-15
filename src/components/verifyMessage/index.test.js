import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import i18n from '../../i18n';
import VerifyMessage from './index';

describe('VerifyMessage', () => {
  let wrapper;
  const publicKey = 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f';
  const signature = '079331d868678fd5f272f09d6dc8792fb21335aec42af7f11caadbfbc17d4707e7d7f343854b0c619b647b81ba3f29b23edb4eaf382a47c534746bad4529560b';
  const message = 'Hello world';

  beforeEach(() => {
    wrapper = mount(<VerifyMessage i18n={i18n} />);
  });

  it('allows to verify a message', () => {
    wrapper.find('.message input').simulate('change', { target: { value: message } });
    wrapper.find('.public-key input').simulate('change', { target: { value: publicKey } });
    wrapper.find('.signature textarea').simulate('change', { target: { value: signature } });
    expect(wrapper.find('.result textarea').text()).to.equal('Message verified');
  });

  it('recognizes invalid public key', () => {
    wrapper.find('.message input').simulate('change', { target: { value: message } });
    wrapper.find('.public-key input').simulate('change', { target: { value: publicKey.substr(2) } });
    wrapper.find('.signature textarea').simulate('change', { target: { value: signature } });
    wrapper.update();
    expect(wrapper.find('Input.public-key').text()).to.contain('Invalid');
  });

  it('recognizes invalid signature', () => {
    wrapper.find('.message input').simulate('change', { target: { value: message } });
    wrapper.find('.public-key input').simulate('change', { target: { value: publicKey } });
    wrapper.find('.signature textarea').simulate('change', { target: { value: signature.substr(2) } });
    expect(wrapper.find('Input.signature').text()).to.contain('Invalid');
  });
});
