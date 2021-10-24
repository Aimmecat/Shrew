/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 李洪文
 * @Date: 2020-09-01 07:25:45
 * @LastEditors: liuweis
 * @LastEditTime: 2020-12-27 19:57:33
 */
import {
  Interface,
  BaseClass,
  Property,
  CodeGenerator,
  Surrounding,
} from 'pont-engine';
export default class MyGenerator extends CodeGenerator {
  getInterfaceContentInDeclaration(inter: Interface) {
    const requestParams = inter.getRequestParams();
    const paramsCode = inter.getParamsCode('Params');

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;

      export function request(${requestParams}): Promise<Response>;
    `;
  }

  getBaseClassInDeclaration(base: BaseClass) {
    const originProps = base.properties;

    base.properties = base.properties.map((prop) => {
      return new Property({
        ...prop,
        required: false,
      });
    });

    const result = super.getBaseClassInDeclaration(base);
    base.properties = originProps;

    return result;
  }

  getInterfaceContent(inter: Interface) {
    const method = inter.method.toUpperCase();
    const requestParams = inter.getRequestParams(this.surrounding);
    const paramsCode = inter.getParamsCode('Params', this.surrounding);

    return `
    /**
     * @desc ${inter.description}
     */

    import * as defs from '../../baseClass';
    import { PontCore } from '@/utils/pontCore';
    import { BACKEND_URL } from '../../../constants'
    import user from '@/utils/user';
    import { message } from 'antd';
    export ${paramsCode}

    export const init = ${inter.response.getInitialValue()};

    export const request = async (${requestParams}) => {
      options = options || {};
      const accessToken  = user.getToken();
      options.headers = {
        accessToken
      }

      try{
        const result = await PontCore.fetch(PontCore.getUrl(\`\${BACKEND_URL}${
          inter.path
        }\`, params, "${method}"), ${inter.getRequestContent()});
        if (!result || !result.success) {
          if (!options?.hideError) {
            message.error(result?.message || '获取数据失败');
            return undefined;
          }
    
          throw new Error(result?.message || '获取数据失败');
        }
        return result.data;
      } catch (ex) {
        if (!options?.hideError) {
          message.error(ex?.message || '获取数据失败');
          return undefined;
        }
        throw new Error(ex?.message || '获取数据失败');
      }
    }
   `;
  }
}
