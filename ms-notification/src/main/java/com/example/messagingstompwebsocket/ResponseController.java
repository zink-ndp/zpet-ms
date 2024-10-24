package com.example.messagingstompwebsocket;

import com.example.messagingstompwebsocket.request.NewAppointmentRequest;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Controller
public class ResponseController {

    @MessageMapping("/new-apm")
	@SendTo("/apm/news")
	public Response greeting(NewAppointmentRequest req) throws Exception {
		String customerId = req.getCustomerId();
		String customerName = req.getName();
		Response res = new Response();
		res.setTitle("Lịch hẹn mới");
		res.setContent("Khách hàng "+customerName+" đã tạo một cuộc hẹn mới!");
		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
		res.setTimestamp(dateTime.format(formatter));
		System.out.println(res.toString());
		return res;
	}

}
