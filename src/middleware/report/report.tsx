import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client } from '../../network/apiClient';
import { setAddPropertyLoader, setAddPropertyState } from '../../redux/store/properties/properties';
import { setCreateReportState, setReportLoader, setReportReasonsData } from '../../redux/store/report/report';

interface CreateReport {
    model_type: string;
    model_id: number,
    reason_id: number,
    comment: string,
};

export const getReportReasons = createAsyncThunk(
    'REPORT_REASONS',
    async (args: any, thunkApi) => {
        thunkApi.dispatch(setReportLoader(true));
        try {
            const response: any = await client.get(endpoints.reports_reasons);
            thunkApi.dispatch(setReportReasonsData(response.data.data));
            thunkApi.dispatch(setReportLoader(false));
        } catch (err) {
            thunkApi.dispatch(setReportLoader(false));
            console.log(err);
        }
    },
);

export const createReport = createAsyncThunk(
    'CREATE_REPORT',
    async (args: CreateReport, thunkApi) => {
        console.log('args---createReport-----', args);
        
        thunkApi.dispatch(setReportLoader(true));
        try {
            const data = {
                model_type: args?.model_type,
                model_id: args.model_id,
                reason_id: args.reason_id,
                comment: args.comment,
            };
            const response: any = await client.post(endpoints.create_report, data);
            console.log('response---createReport-----', response);
            
            thunkApi.dispatch(setReportLoader(false));
            thunkApi.dispatch(setCreateReportState('done'));
            
        } catch (err) {
            thunkApi.dispatch(setAddPropertyLoader(false));
            thunkApi.dispatch(setCreateReportState('error'));
            console.log('err--uploadImage-', err);
        }
    },
);