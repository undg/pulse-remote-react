/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** HTTPValidationError */
export interface HTTPValidationError {
    /** Detail */
    detail?: ValidationError[]
}

/** ISink_serialize */
export interface ISinkSerialize {
    /** Volume */
    volume: IVolume[]
    /** Description */
    description: string
    /** Name */
    name: string
    /** Index */
    index: number
    /** Mute */
    mute: boolean
    /** Raw */
    raw: string
}

/** IVolume */
export interface IVolume {
    /** Name */
    name: string
    /** Value */
    value: number
}

/** IVolume_Info */
export interface IVolumeInfo {
    /** Index */
    index: number
    /** Mute */
    mute: boolean
    /** Name */
    name: string
    /** Volume */
    volume: number
}

/** ValidationError */
export interface ValidationError {
    /** Location */
    loc: (string | number)[]
    /** Message */
    msg: string
    /** Error Type */
    type: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean
    /** request path */
    path: string
    /** content type of request body */
    type?: ContentType
    /** query params */
    query?: QueryParamsType
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat
    /** request body */
    body?: unknown
    /** base url */
    baseUrl?: string
    /** request cancellation token */
    cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string
    baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
    customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D
    error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = ''
    private securityData: SecurityDataType | null = null
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
    private abortControllers = new Map<CancelToken, AbortController>()
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

    private baseApiParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig)
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data
    }

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key)
        return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key])
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key]
        return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {}
        const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key])
        return keys
            .map(key =>
                Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)
            )
            .join('&')
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery)
        return queryString ? `?${queryString}` : ''
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
        [ContentType.Text]: (input: any) =>
            input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key]
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === 'object' && property !== null
                          ? JSON.stringify(property)
                          : `${property}`
                )
                return formData
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    }

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        }
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken)
            if (abortController) {
                return abortController.signal
            }
            return void 0
        }

        const abortController = new AbortController()
        this.abortControllers.set(cancelToken, abortController)
        return abortController.signal
    }

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken)

        if (abortController) {
            abortController.abort()
            this.abortControllers.delete(cancelToken)
        }
    }

    public request = async <T = any, E = any>({
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken,
        ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {}
        const requestParams = this.mergeRequestParams(params, secureParams)
        const queryString = query && this.toQueryString(query)
        const payloadFormatter = this.contentFormatters[type || ContentType.Json]
        const responseFormat = format || requestParams.format

        return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
            },
            signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
            body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
        }).then(async response => {
            const r = response.clone() as HttpResponse<T, E>
            r.data = null as unknown as T
            r.error = null as unknown as E

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then(data => {
                          if (r.ok) {
                              r.data = data
                          } else {
                              r.error = data
                          }
                          return r
                      })
                      .catch(e => {
                          r.error = e
                          return r
                      })

            if (cancelToken) {
                this.abortControllers.delete(cancelToken)
            }

            if (!response.ok) throw data
            return data
        })
    }
}

/**
 * @title FastAPI
 * @version 0.1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    volumeDeviceOut = {
        /**
         * @description Set volume in percent for output device with given index.
         *
         * @name VdoSetVolumeDeviceOutSetVolCardGet
         * @summary Vdo Set
         * @request GET:/volume-device-out/set/{vol}/{card}
         */
        vdoSetVolumeDeviceOutSetVolCardGet: (vol: number, card: number, params: RequestParams = {}) =>
            this.request<ISinkSerialize[], HTTPValidationError>({
                path: `/volume-device-out/set/${vol}/${card}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description Set volume up for output device with given index.
         *
         * @name VdoUpVolumeDeviceOutUpCardGet
         * @summary Vdo Up
         * @request GET:/volume-device-out/up/{card}
         */
        vdoUpVolumeDeviceOutUpCardGet: (card: number, params: RequestParams = {}) =>
            this.request<ISinkSerialize[], HTTPValidationError>({
                path: `/volume-device-out/up/${card}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description Set volume down for output device with given index.
         *
         * @name VdoDownVolumeDeviceOutDownCardGet
         * @summary Vdo Down
         * @request GET:/volume-device-out/down/{card}
         */
        vdoDownVolumeDeviceOutDownCardGet: (card: number, params: RequestParams = {}) =>
            this.request<ISinkSerialize[], HTTPValidationError>({
                path: `/volume-device-out/down/${card}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description Toggle mute for output device with given index.
         *
         * @name VdoMuteVolumeDeviceOutToggleCardGet
         * @summary Vdo Mute
         * @request GET:/volume-device-out/toggle/{card}
         */
        vdoMuteVolumeDeviceOutToggleCardGet: (card: number, params: RequestParams = {}) =>
            this.request<ISinkSerialize[], HTTPValidationError>({
                path: `/volume-device-out/toggle/${card}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description Get informations for output device with given index.
         *
         * @name VdoInfoVolumeDeviceOutInfoGet
         * @summary Vdo Info
         * @request GET:/volume-device-out/info
         */
        vdoInfoVolumeDeviceOutInfoGet: (params: RequestParams = {}) =>
            this.request<ISinkSerialize[], any>({
                path: `/volume-device-out/info`,
                method: 'GET',
                format: 'json',
                ...params,
            }),
    }
    volumeApp = {
        /**
         * No description
         *
         * @name VaInfoVolumeAppInfoGet
         * @summary Va Info
         * @request GET:/volume-app/info
         */
        vaInfoVolumeAppInfoGet: (params: RequestParams = {}) =>
            this.request<IVolumeInfo[], any>({
                path: `/volume-app/info`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name VaUpVolumeAppUpIndexGet
         * @summary Va Up
         * @request GET:/volume-app/up/{index}
         */
        vaUpVolumeAppUpIndexGet: (index: number, params: RequestParams = {}) =>
            this.request<IVolumeInfo, HTTPValidationError>({
                path: `/volume-app/up/${index}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name VaDownVolumeAppDownIndexGet
         * @summary Va Down
         * @request GET:/volume-app/down/{index}
         */
        vaDownVolumeAppDownIndexGet: (index: number, params: RequestParams = {}) =>
            this.request<IVolumeInfo, HTTPValidationError>({
                path: `/volume-app/down/${index}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description Set volume in percent for application with given index.
         *
         * @name VaSetVolumeAppSetVolIndexGet
         * @summary Va Set
         * @request GET:/volume-app/set/{vol}/{index}
         */
        vaSetVolumeAppSetVolIndexGet: (index: number, vol: number, params: RequestParams = {}) =>
            this.request<IVolumeInfo, HTTPValidationError>({
                path: `/volume-app/set/${vol}/${index}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name VaToggleVolumeAppToggleIndexGet
         * @summary Va Toggle
         * @request GET:/volume-app/toggle/{index}
         */
        vaToggleVolumeAppToggleIndexGet: (index: number, params: RequestParams = {}) =>
            this.request<IVolumeInfo, HTTPValidationError>({
                path: `/volume-app/toggle/${index}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),
    }
}
